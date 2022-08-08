import JsonProperty from '@helpers/jsonProperty';
import Product from './product';

export default class OrderDto {
  id: number | undefined = undefined;

  @JsonProperty({
    type: 'ProductDto'
  })
  products: Product[] | undefined = undefined;
}
