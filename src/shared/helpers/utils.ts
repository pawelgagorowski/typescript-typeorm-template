export function hasOwn<T = any>(object: T | any, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  if (typeof obj !== 'object') return [];
  if (Array.isArray(obj)) return [];
  return Object.keys(obj as T) as (keyof T)[];
}

export const isNullOrUndefined = (arg: any): boolean => arg === null || arg === undefined;

export const isFunction = (arg: any): boolean => typeof arg === 'function';

export function isNumber(value: any): boolean {
  // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
  // and other non-number values as NaN, where Number just uses 0) but it considers the string
  // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
  return !Number.isNaN(Number(parseFloat(value as any))) && !Number.isNaN(Number(value));
}

export const isElementInArray = (array: string[], element: string): boolean =>
  array.some((arrayElement) => arrayElement === element);

export function isObjectType(val: any): boolean {
  return typeof val === 'object';
}

export function isArrayType(type: any): boolean {
  return type === Array || Object.prototype.toString.call(type) === '[object Array]';
}

export function isStringType(value: any) {
  return typeof value === 'string' || value instanceof String || value === String;
}

export function isNumberType(value: any) {
  return typeof value === 'number' || value instanceof Number || value === Number;
}

export function hasAnyNullOrUndefinedArgument(...args: any[]): boolean {
  return args.some(isNullOrUndefined);
}

export function isBooleanType(value: any) {
  return typeof value === 'boolean' || value instanceof Boolean || value === Boolean;
}

export function isPrimitive(value: any): boolean {
  return [isStringType, isNumberType, isBooleanType].some((fn) => fn(value));
}
