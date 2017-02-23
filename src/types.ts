import {
    T,
    compose,
    cond,
    contains,
    equals,
    identity,
    pipe,
    prop,
    propEq,
    replace,
    take,
    tryCatch
} from 'ramda';
import { Just, Nothing } from 'data.maybe';

export const Integer = { type: 'Integer' };
export const Double = { type: 'Double' };
export const DateTime = { type: 'DateTime' };
export const Natural = { type: 'Natural' };
export const Char = (length: number) => ({ type: 'Char', length });
export const IntegerRange = (from: number, to: number) => ({ type: 'IntegerRange', from, to });
export const DoubleRange = (from: number, to: number) => ({ type: 'DoubleRange', from, to });
export const Money = { type: 'Money' };
export const String = { type: 'String' };
export const Color = { type: 'Color' };
export const Email = { type: 'Email' };
export const Checkbox = { type: 'Checkbox' };
export const Password = { type: 'Password' };
export const OneOf = (values: string[]) => ({ type: 'OneOf', values });
export const Url = { type: 'Url' };

export const getTypeName: (type: Type) => string = cond([
    [propEq('type', 'Char'), t => `Char(${t.length})`],
    [propEq('type', 'IntegerRange'), t => `IntegerRange(${t.from}, ${t.to})`],
    [propEq('type', 'DoubleRange'), t => `DoubleRange(${t.from}, ${t.to})`],
    [propEq('type', 'OneOf'), t => `OneOf([${t.values.join(', ')}])`],
    [T, prop('type')]
]);

// Type validators
const valueOrNothing = {
    Integer: input => {
        const intValue = parseInt(input);
        return isNaN(intValue) ? Nothing() : Just(intValue);
    },
    Double: input => {
        const doubleValue = parseFloat(input);
        return isNaN(doubleValue) ? Nothing() : Just(doubleValue);
    },
    DateTime: input => {
        const date = new Date(input);
        return isNaN(date.getMilliseconds()) ? Nothing() : Just(date);
    },
    Natural: input => {
        const intValue = parseInt(input);
        return isNaN(intValue) || intValue < 0 ? Nothing() : Just(intValue);
    },
    Char: (input, { length }) => {
        return Just(take(length, input));
    },
    IntegerRange: (input, { from, to }) => {
        const intValue = parseInt(input);
        return isNaN(intValue) || intValue < from || intValue > to ? Nothing() : Just(intValue);
    },
    DoubleRange: (input, { from, to }) => {
        const doubleValue = parseFloat(input);
        return isNaN(doubleValue) || doubleValue < from || doubleValue > to ? Nothing() : Just(doubleValue);
    },
    Money: input => {
        const money = parseFloat(replace(',', '.', input));
        return isNaN(money) ? Nothing() : Just(money);
    },
    Color: input => {
        return /^#[a-f0-9]{3}$/.test(input)
            || /^#[a-f0-9]{6}$/.test(input) ? Just(input) : Nothing();
    },
    String: Just
};

export const convertType: (input: string, type: Type) => any = (input, type) =>
    valueOrNothing[type.type](input, type).getOrElse(null);


/**
export const Email = { type: 'Email' };
export const Checkbox = { type: 'Checkbox' };
export const Password = { type: 'Password' };
export const OneOf = (values: string[]) => ({ type: 'OneOf', values });
export const Url = { type: 'Url' };
 */