import { z } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    AddProductRequest:
 *      type: object
 *      required:
 *        - description
 *      properties:
 *        description:
 *          type: string
 */

export const CreateProductRequestZodSchema = z
  .object({
    description: z.string()
  })
  .refine(() => true);

export const GetProductIdRequestZodSchema = z
  .object({
    productId: z.string()
  })
  .refine(() => true);

export const CreateOrderRequestZodSchema = z
  .object({
    productIds: z.array(z.number())
  })
  .refine(() => true);
