import { Request, Response, Router } from 'express';
import { ILogger } from '@config/logger/types';
import { Features } from '@config/features';
import { IController, HttpMethod, ApiPath, BasicDependencies, ControllerConfig } from '@server/types';

class HealtController implements IController {
  public readonly logger: ILogger;
  public readonly path: ApiPath;
  public readonly method: HttpMethod;
  public readonly feature: keyof Features | (keyof Features)[];
  public readonly router: Router;

  constructor(basicDependencies: BasicDependencies, controllerConfig: ControllerConfig) {
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
     * /api/healthCheck:
     *  get:
     *     tags:
     *     - system
     *     description: Responds if the app is up and running
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
     */
    this.router[this.method](this.path, this.ping);
  };

  public ping = (_req: Request, res: Response): Response<any> | any => res.json({ message: 'App is running' });
}

export default HealtController;
