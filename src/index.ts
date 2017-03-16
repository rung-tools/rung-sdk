/// <reference path="../typings/index.d.ts"; />

export function create(extension: (ctx?: Context) => any, config?: Config) {
    if (typeof extension !== 'function') {
        throw new Error('Expected extension to be a function');
    }

    return { extension, config };
}
