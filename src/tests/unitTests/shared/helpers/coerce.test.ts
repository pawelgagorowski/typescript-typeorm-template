import { isFunction, isNullOrUndefined, isNumber, objectKeys } from '../../../../shared/helpers/utils';

describe('utils functions', () => {
  it('isNumber fn should return true for intiger', () => {
    expect(isNumber(1)).toBe(true);
  });

  it('isNumber fn should return true for string that are able to convert to intiger', () => {
    expect(isNumber('1')).toBe(true);
  });

  it('isNumber fn should return false for mix and only alphabets characters', () => {
    expect(isNumber('1a')).toBe(false);
  });

  it('isNumber fn should return false for other primitive values', () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber(NaN)).toBe(false);
  });

  it('isNumber fn should return false for other reference values', () => {
    expect(isNumber({})).toBe(false);
    expect(isNumber({ name: 'Paweł' })).toBe(false);
    expect(isNumber(['hello'])).toBe(false);
  });

  it('objectKeys fn should return keys for object', () => {
    expect(objectKeys({ name: 'Paweł', surname: 'RODO' })).toEqual(['name', 'surname']);
  });

  it('objectKeys fn should return empty array for empty object', () => {
    expect(objectKeys({})).toEqual([]);
  });

  it('objectKeys fn should return empty array for primitive values', () => {
    expect(objectKeys('string' as any)).toEqual([]);
    expect(objectKeys(1 as any)).toEqual([]);
    expect(objectKeys(undefined as any)).toEqual([]);
  });

  it('objectKeys fn should return empty array for array values', () => {
    expect(objectKeys(['fsdf', 'sdfds'])).toEqual([]);
  });

  it('isNullOrUndefined fn should return false for not null', () => {
    expect(isNullOrUndefined('string')).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
    expect(isNullOrUndefined([])).toBe(false);
  });

  it('isNullOrUndefined fn should return false for not null', () => {
    expect(isNullOrUndefined('string')).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
    expect(isNullOrUndefined([])).toBe(false);
  });

  it('isFunction fn should return true for fn', () => {
    expect(isFunction(() => null)).toBe(true);
  });

  it('isFunction fn should return false for no function', () => {
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
  });
});

// TODO continue
