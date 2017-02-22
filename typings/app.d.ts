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
