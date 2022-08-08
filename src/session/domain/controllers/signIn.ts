import { Request, Response, Router } from 'express';
import { ILogger } from '@config/logger/types';
import { Features } from '@config/features';
import {
  IController,
  HttpMethod,
  ApiPath,
  BasicDependencies,
  ControllerConfig,
  ControllerMiddlewares,
  ZodValidatingObject
} from '@server/types';
import BasicControllerMiddlewares from '@server/controller';
import { getUserByEmail } from '@/user/domain/ports/persistence';
import postgresqlAdapter from '@/user/adapters/postgresqlAdapter';
import { User } from '@/user/models/user';
import { checkPassword, createAccessToken, createRefreshToken } from '../ports/session';
import jwtAdapter from '@/session/adapters/jwtAdapter';
import { UserValidation } from '../../types';

class SignUpController extends BasicControllerMiddlewares implements IController {
  public readonly logger: ILogger;
  public readonly path: ApiPath;
  public readonly method: HttpMethod;
  public readonly feature: keyof Features | (keyof Features)[];
  public readonly router: Router;
  public readonly bodyValidatingObject: ZodValidatingObject;

  constructor(
    basicDependencies: BasicDependencies,
    controllerConfig: ControllerConfig,
    controllerMiddlewares: ControllerMiddlewares
  ) {
    super();
    this.bodyValidatingObject = controllerMiddlewares.bodyValidation!;
    this.logger = basicDependencies.logger;
    this.path = controllerConfig.path;
    this.method = controllerConfig.method;
    this.feature = controllerConfig.feature;
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes = (): void => {
    /**
     * @openapi
     * /api/v1/auth/signIn:
     *  post:
     *     tags:
     *     - session
     *     description: user sign in
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/SignInRequest'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/SignInResponse'
     */
    this.router[this.method](this.path, this.validate(this.bodyValidatingObject, 'body'), this.signIn);
  };

  private signIn = async (req: Request<{}, {}, UserValidation>, res: Response): Promise<Response<any> | any> => {
    const { email, password } = req.body;
    const user = await getUserByEmail<User>(postgresqlAdapter, email);

    if (!user) return res.json({ message: 'user does not exist' });
    const { password: hashedPassword, id: userId } = user;
    const isPasswordValid = checkPassword(jwtAdapter, password, hashedPassword);

    if (!isPasswordValid) return res.json({ message: 'wrong password' });
    const accessToken = createAccessToken(jwtAdapter, { userId });
    const refreshToken = createRefreshToken(jwtAdapter, { userId });
    const result = {
      refreshToken,
      accessToken
    };
    return res.json({ authTokens: result });
  };
}

export default SignUpController;
