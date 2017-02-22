/// <reference path="../typings/index.d.ts"; />
import * as readline from 'readline';
import * as Bluebird from 'bluebird';
import 'colors';

declare module './vm' {
    export function run(self: any): any;
}

function run(self) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const getLine = Bluebird.promisify((text, callback) => {
        rl.question(text, callback.bind(null, null));
    });

    const putStrLn = Bluebird.promisify((text, callback) => {
        rl.write(text + '\n');
        callback();
    });

    console.log(self);
}

exports.run = run;
