import { Request, Response, Router } from 'express';
import { ILogger } from '@config/logger/types';
import { Features } from '@config/features';
import {
  IController,
  HttpMethod,
  ApiPath,
  ZodValidatingObject,
  BasicDependencies,
  ControllerConfig,
  ControllerMiddlewares
} from '@server/types';
import BasicControllerMiddlewares from '@server/controller';
import { createUser, getUserByEmail } from '../ports/persistence';
import userPostgresAdapter from '../../adapters/postgresqlAdapter';
import { UserRegister } from '@/user/types';

class CreateUserController extends BasicControllerMiddlewares implements IController {
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
     * /api/v1/register:
     *  post:
     *     tags:
     *     - user
     *     description: user sign up
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/UserRegisterRequest'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *
     */
    this.router[this.method](this.path, this.validate(this.bodyValidatingObject, 'body'), this.createUser);
  };

  private createUser = async (req: Request<{}, {}, UserRegister>, res: Response): Promise<Response<string> | any> => {
    const user = req.body;
    if (await getUserByEmail(userPostgresAdapter, user.email)) return res.json({ message: 'user already excists' });
    const result = await createUser(userPostgresAdapter, user);
    return res.json({ message: result });
  };
}

export default CreateUserController;
