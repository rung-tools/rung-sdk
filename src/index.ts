import { run } from './vm';

interface Context {
    params: { [name: string]: { value: any } },
    rung: {
        version: string
    }
}

interface Config {
    params: {
        [name: string]: {
            default?: any,
            description?: string | { [lang: string]: string },
            type?: { type: String }
        }
    }
}

export function create(extension: (ctx?: Context) => any, config?: Config) {
    if (typeof extension !== 'function') {
        throw new Error('Expected extension to be a function');
    }

    return { extension, config, run };
}
