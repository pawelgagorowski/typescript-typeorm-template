export function hasOwn<T = any>(object: T | any, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function objectKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj as any) as (keyof T)[];
}

export const isNullOrUndefined = (arg: any): boolean => arg === null || arg === undefined;

export const isFunction = (arg: any): boolean => typeof arg === 'function';
