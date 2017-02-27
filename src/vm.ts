/// <reference path="../typings/index.d.ts"; />
import * as readline from 'readline';
import { promisify } from 'bluebird';
import { cond, keys, mergeAll, T } from 'ramda';
import 'colors';
import { getTypeName, convertType } from './types';

declare module './vm' {
    export function run(extension: (ctx?: Context) => any, config?: Config): void;
}

function run(extension: (ctx?: Context, callback?: Function) => any, config?: Config): void {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const getLine = promisify((text, callback) => {
        rl.question(`${text}: `, callback.bind(null, null)); });

    const putStrLn = promisify((text, callback) => {
        rl.write(`${text}\n`);
        callback(); });

    function askQuestions(remaining, answered, callback) {
        if (remaining.length) {
            const [head, ...tail] = remaining;
            const { description, type, default: def } = config.params[head];
            getLine(`(${getTypeName(<Type>type).red}) ${(<string>description).blue}`)
                .done(answer => {
                    const literalValue = convertType(answer, <Type>type, def);

                    if (literalValue === null) {
                        askQuestions(remaining, answered, callback);
                    } else {
                        askQuestions(tail, answered.concat([{ [head]: literalValue }]), callback);
                    }
                });
        } else {
            callback(answered);
        }
    }

    const ask = promisify((questions, callback) => {
        askQuestions(questions, [], callback.bind(null, null)); });

    ask(keys(config.params))
        .then(results => {
            const context = <Context>{ params: mergeAll(results) };

            if (extension.length > 1) {
                // Got async computation
                extension(context, output => {
                    console.log(output);
                });
            } else {
                const output = extension(context);
                console.log(output);
            }
        })
        .then(rl.close.bind(rl));
}

exports.run = run;
