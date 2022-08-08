import JsonProperty from '@helpers/jsonProperty';
import { User } from '@user/models/user';
import Order from './order';

export default class ProductDto {
  id: number | undefined = undefined;

  description: string | undefined = undefined;

  @JsonProperty({
    type: 'UserDto'
  })
  user: User | undefined = undefined;

  @JsonProperty({
    type: 'OrderDto'
  })
  orders: Order[] | undefined = undefined;
}
