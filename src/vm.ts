/// <reference path="../typings/globals/node/index.d.ts"; />
import * as readline from 'readline';
import * as Bluebird from 'bluebird';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = Bluebird.promisify((text, callback) => {
    rl.question(text, callback.bind(null, null));
});
