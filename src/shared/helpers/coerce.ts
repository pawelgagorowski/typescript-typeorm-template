/* eslint-disable no-nested-ternary */
import { isNullOrUndefined, isNumber } from './utils';

export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : isNullOrUndefined(value) ? [] : [value];
}

export function coerceNumber(value: any): number;
export function coerceNumber<D>(value: any, fallback: D): number | D;
export function coerceNumber(value: any, fallbackValue = 0) {
  return isNumber(value) ? Number(value) : fallbackValue;
}

export function coerceObject<T>(value?: T): T {
  if (!value) return <T>{};
  return isNullOrUndefined(value) ? <T>{} : value;
}
