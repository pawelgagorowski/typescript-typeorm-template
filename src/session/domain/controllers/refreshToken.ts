import { Request, Response, Router } from 'express';
import { ILogger } from '@config/logger/types';
import { Features } from '@config/features';
import { IController, HttpMethod, ApiPath, ControllerConfig, BasicDependencies } from '@server/types';
import BasicControllerMiddlewares from '@server/controller';
import { createAccessToken } from '../ports/session';
import jwtAdapter from '@/session/adapters/jwtAdapter';

class RefreshTokenController extends BasicControllerMiddlewares implements IController {
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
     * /api/v1/auth/refreshToken:
     *  post:
     *     tags:
     *     - session
     *     description: get new access token
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                refreshToken:
     *                  type: string
     */
    this.router[this.method](this.path, this.authorizeToken('refresh-token'), this.getAccessToken);
  };

  public getAccessToken = async (req: Request, res: Response): Promise<any> => {
    const accessToken = createAccessToken(jwtAdapter, req.user);
    return res.json({ accessToken });
  };
}

export default RefreshTokenController;
