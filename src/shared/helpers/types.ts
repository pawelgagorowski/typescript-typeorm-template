export type MapperMetadataClasse = 'Product' | 'ProductDto' | 'Order' | 'OrderDto' | 'User' | 'UserDto';

export interface MapperMetadata<T> {
  name?: keyof T | string;
  type?: MapperMetadataClasse;
  converter?: Converter;
  excludeToJson?: boolean;
}

export interface Converter<T = any> {
  fromJson?(value: any, json?: any): T;
  toJson?(value: T, obj?: any): any;
}
