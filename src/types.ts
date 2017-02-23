import {
    compose,
    cond,
    contains,
    equals,
    identity,
    pipe,
    prop,
    propEq,
    T,
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
    String: Just
};

export const convertType: (input: string, type: Type) => any = (input, type) =>
    valueOrNothing[type.type](input, type).getOrElse(null);
