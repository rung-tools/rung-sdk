"use strict";
const ramda_1 = require("ramda");
const data_maybe_1 = require("data.maybe");
const validator_1 = require("validator");
exports.Integer = { name: 'Integer' };
exports.Double = { name: 'Double' };
exports.DateTime = { name: 'DateTime' };
exports.Natural = { name: 'Natural' };
exports.Char = (length) => ({ name: 'Char', length });
exports.IntegerRange = (from, to) => ({ name: 'IntegerRange', from, to });
exports.DoubleRange = (from, to) => ({ name: 'DoubleRange', from, to });
exports.Money = { name: 'Money' };
exports.String = { name: 'String' };
exports.Color = { name: 'Color' };
exports.Email = { name: 'Email' };
exports.Checkbox = { name: 'Checkbox' };
exports.OneOf = (values) => ({ name: 'OneOf', values });
exports.Url = { name: 'Url' };
exports.getTypeName = ramda_1.cond([
    [ramda_1.propEq('name', 'Char'), t => `Char(${t.length})`],
    [ramda_1.propEq('name', 'IntegerRange'), t => `IntegerRange(${t.from}, ${t.to})`],
    [ramda_1.propEq('name', 'DoubleRange'), t => `DoubleRange(${t.from}, ${t.to})`],
    [ramda_1.propEq('name', 'OneOf'), t => `OneOf([${t.values.join(', ')}])`],
    [ramda_1.T, ramda_1.prop('name')]
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
    Char: (input, { length }) => {
        return data_maybe_1.Just(ramda_1.take(length, input));
    },
    IntegerRange: (input, { from, to }) => {
        const intValue = parseInt(input);
        return isNaN(intValue) || intValue < from || intValue > to ? data_maybe_1.Nothing() : data_maybe_1.Just(intValue);
    },
    DoubleRange: (input, { from, to }) => {
        const doubleValue = parseFloat(input);
        return isNaN(doubleValue) || doubleValue < from || doubleValue > to ? data_maybe_1.Nothing() : data_maybe_1.Just(doubleValue);
    },
    Money: input => {
        const money = parseFloat(ramda_1.replace(',', '.', input));
        return isNaN(money) ? data_maybe_1.Nothing() : data_maybe_1.Just(money);
    },
    String: data_maybe_1.Just,
    Color: input => validator_1.isHexColor(input) ? data_maybe_1.Just(input) : data_maybe_1.Nothing(),
    Email: input => validator_1.isEmail(input) ? data_maybe_1.Just(input) : data_maybe_1.Nothing(),
    Checkbox: input => {
        const lowerCaseInput = input.toLowerCase();
        return ramda_1.contains(lowerCaseInput, ['y', 'n']) ? data_maybe_1.Just(lowerCaseInput === 'y') : data_maybe_1.Nothing();
    },
    OneOf: (input, { values }) => ramda_1.contains(input, values) ? data_maybe_1.Just(input) : data_maybe_1.Nothing(),
    Url: input => validator_1.isURL(input) ? data_maybe_1.Just(input) : data_maybe_1.Nothing()
};
exports.convertType = (input, type, def = null) => valueOrNothing[type.name](input, type).getOrElse(def);
