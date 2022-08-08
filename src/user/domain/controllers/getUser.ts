import { Request, Response, Router } from 'express';
import { ILogger } from '@config/logger/types';
import { Features } from '@config/features';
import { IController, HttpMethod, ApiPath, BasicDependencies, ControllerConfig } from '@server/types';
import BasicControllerMiddlewares from '@server/controller';
import jsonMapper from '@helpers/jsonMapper';
import userPostgresAdapter from '@/user/adapters/postgresqlAdapter';
import { getUserById } from '../ports/persistence';
import { User } from '@/user/models/user';
import UserDto from '@/user/models/userDto';

class GetMyProfileController extends BasicControllerMiddlewares implements IController {
  public readonly logger: ILogger;
  public readonly path: ApiPath;
  public readonly method: HttpMethod;
  public readonly feature: keyof Features | (keyof Features)[];
  public readonly router: Router;

  constructor(basicDependencies: BasicDependencies, controllerConfig: ControllerConfig) {
    super();
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
     * /api/v1/me:
     *  get:
     *     tags:
     *     - user
     *     description: get user profile
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/UserDto'
     */
    this.router[this.method](this.path, this.authorizeToken('authorization'), this.getUser);
  };

  public getUser = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.user;
    const user = await getUserById<User>(userPostgresAdapter, userId);
    if (!user) return res.json({ message: 'no user found' });
    const result = jsonMapper(UserDto, user);
    return res.send(result);
  };
}

export default GetMyProfileController;
