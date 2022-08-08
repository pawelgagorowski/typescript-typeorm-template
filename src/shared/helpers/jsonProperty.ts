import config from 'config';
import { MapperMetadata } from './types';

export default function JsonProperty<T>(metadata?: MapperMetadata<T> | string): ReflectDecorator {
  let decoratorMetaData: MapperMetadata<T>;
  if (typeof metadata === 'string') {
    decoratorMetaData = { name: metadata } as MapperMetadata<T>;
  } else if (typeof metadata === 'object') {
    decoratorMetaData = metadata as MapperMetadata<T>;
  } else {
    throw new Error(`index.ts: meta data in Json property is undefined. meta data: ${metadata}`);
  }

  return Reflect.metadata(config.get<string>('jsonMetaDataKey'), decoratorMetaData) as any;
}

type ReflectDecorator = (target: unknown, targetKey: string | symbol) => void;
