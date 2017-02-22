"use strict";
function create(extension, config) {
    if (typeof extension !== 'function') {
        throw new Error('Expected extension to be a function');
    }
    return { extension, config };
}
exports.create = create;
