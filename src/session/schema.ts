import { z } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    SignInRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: test@test.pl
 *        password:
 *          type: string
 *          default: Test12345
 *    SignInResponse:
 *      type: object
 *      properties:
 *        authTokens:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *             accessToken:
 *               type: string
 */

export const SignInZodSchema = z
  .object({
    email: z.string().email(),
    password: z.string()
  })
  .refine(() => true);

export const RefreshTokenZodSchema = z
  .object({
    refreshTokenId: z.string(),
    userId: z.string(),
    expiryDate: z.string()
  })
  .refine(() => true);
