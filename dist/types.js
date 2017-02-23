"use strict";
const ramda_1 = require("ramda");
const data_maybe_1 = require("data.maybe");
exports.Integer = { type: 'Integer' };
exports.Double = { type: 'Double' };
exports.DateTime = { type: 'DateTime' };
exports.Natural = { type: 'Natural' };
exports.Char = (length) => ({ type: 'Char', length });
exports.IntegerRange = (from, to) => ({ type: 'IntegerRange', from, to });
exports.DoubleRange = (from, to) => ({ type: 'DoubleRange', from, to });
exports.Money = { type: 'Money' };
exports.String = { type: 'String' };
exports.Color = { type: 'Color' };
exports.Email = { type: 'Email' };
exports.Checkbox = { type: 'Checkbox' };
exports.Password = { type: 'Password' };
exports.OneOf = (values) => ({ type: 'OneOf', values });
exports.Url = { type: 'Url' };
exports.getTypeName = ramda_1.cond([
    [ramda_1.propEq('type', 'Char'), t => `Char(${t.length})`],
    [ramda_1.propEq('type', 'IntegerRange'), t => `IntegerRange(${t.from}, ${t.to})`],
    [ramda_1.propEq('type', 'DoubleRange'), t => `DoubleRange(${t.from}, ${t.to})`],
    [ramda_1.propEq('type', 'OneOf'), t => `OneOf([${t.values.join(', ')}])`],
    [ramda_1.T, ramda_1.prop('type')]
]);
// Type validators
const valueOrNothing = {
    Integer: input => {
        const intValue = parseInt(input);
        return isNaN(intValue) ? data_maybe_1.Nothing() : data_maybe_1.Just(intValue);
    },
    Double: input => {
        const doubleValue = parseFloat(input);
        return isNaN(doubleValue) ? data_maybe_1.Nothing() : data_maybe_1.Just(doubleValue);
    },
    DateTime: input => {
        const date = new Date(input);
        return isNaN(date.getMilliseconds()) ? data_maybe_1.Nothing() : data_maybe_1.Just(date);
    },
    Natural: input => {
        const intValue = parseInt(input);
        return isNaN(intValue) || intValue < 0 ? data_maybe_1.Nothing() : data_maybe_1.Just(intValue);
    },
    String: data_maybe_1.Just
};
exports.convertType = (input, type) => valueOrNothing[type.type](input, type).getOrElse(null);
