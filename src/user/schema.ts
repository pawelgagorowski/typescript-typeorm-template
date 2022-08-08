import { z } from 'zod';

export const LanguageEnum = z.enum(['pl', 'en']);

/**
 * @openapi
 * components:
 *  schemas:
 *    UserRegisterRequest:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        language:
 *          type: string
 *        firstName:
 *          type: string
 *        password:
 *          type: string
 *        passwordConfirmation:
 *          type: string
 */
export const UserRegisterZodSchema = z
  .object({
    email: z
      .string({
        required_error: 'email is required'
      })
      .email(),
    firstName: z.string({
      required_error: 'first name is required'
    }),
    language: LanguageEnum,
    password: z
      .string({
        required_error: 'password is required'
      })
      .min(8)
      .max(30),
    passwordConfirmation: z
      .string({
        required_error: 'password confirmation is required'
      })
      .min(8)
      .max(30)
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match"
  });
