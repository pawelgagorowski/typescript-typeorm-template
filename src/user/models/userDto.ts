import JsonProperty from '@helpers/jsonProperty';
import Order from '@shop/models/order';

/**
 * @openapi
 * components:
 *  schemas:
 *    UserDto:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        language:
 *          type: string
 *        name:
 *          type: string
 *        orders:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              product:
 *                type: string
 *              id:
 *                type: number
 */
export default class UserDto {
  id: number | undefined = undefined;

  email: string | undefined = undefined;

  language: string | undefined = undefined;

  @JsonProperty('firstName')
  name: string | undefined = undefined;

  @JsonProperty({
    type: 'OrderDto'
  })
  orders: Order[] | undefined = undefined;
}
