import 'reflect-metadata';
import config from 'config';
import Entities from '@/entities';
import { hasAnyNullOrUndefinedArgument, isArrayType, isObjectType, isPrimitive } from './utils';
import { MapperMetadata } from './types';
import { coerceArray } from './coerce';

function getTypeConstructor<T>(target: T, propertyKey: keyof T): new () => T {
  return Reflect.getMetadata('design:type', target as Object, propertyKey as string);
}

function getJsonProperty<T>(target: any, propertyKey: keyof T): MapperMetadata<T> {
  return Reflect.getMetadata(config.get<string>('jsonMetaDataKey'), target, propertyKey as string);
}

export default function jsonMapper<T>(Type: new () => T, json: any): T | undefined {
  if (hasAnyNullOrUndefinedArgument(Type, json) || !isObjectType(json)) {
    return undefined;
  }

  const instance = new Type();

  (Object.keys(instance as any) as (keyof T)[]).forEach((key) => {
    const metadata = getJsonProperty(instance, key);
    if (!metadata) {
      if (json[key]) instance[key] = json[key];
      if (!instance[key]) delete instance[key];
      return;
    }

    const propertyName = metadata.name || key;
    const propertyType = getTypeConstructor(instance, key);
    const propertyNameArray = coerceArray<string | number | symbol>(propertyName);
    let value: any;

    propertyNameArray.forEach((property) => {
      if (json[property]) value = json[property];
      if (instance[key]) value = instance[key];
    });

    if (metadata.converter && metadata.converter.fromJson) {
      instance[key] = metadata.converter.fromJson(value, json);
      return;
    }

    if (!metadata.type || isPrimitive(propertyType)) {
      instance[key] = value;
      return;
    }

    if (isArrayType(value) && metadata.type) {
      instance[key] = value.map((item: any) => jsonMapper(Entities[metadata.type!] as unknown as new () => T, item));
      return;
    }
    instance[key] = jsonMapper<any>((Entities[metadata.type!] as unknown as new () => T) || propertyType, value);
  });

  return instance;
}
