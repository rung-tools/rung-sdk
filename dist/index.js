"use strict";
const vm_1 = require("./vm");
function create(extension, config) {
    if (typeof extension !== 'function') {
        throw new Error('Expected extension to be a function');
    }
    return { extension, config, run: vm_1.run };
}
exports.create = create;
