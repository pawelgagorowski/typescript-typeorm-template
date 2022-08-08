import { ILogger } from '@config/logger/types';
import { Request, Response, Router } from 'express';
import { Features, features } from '@config/features';
import { IController, HttpMethod, ApiPath, BasicDependencies, ControllerConfig } from '@server/types';

class ConfigController implements IController {
  public readonly logger: ILogger;
  public readonly router: Router;
  public readonly path: ApiPath;
  public readonly method: HttpMethod;
  public readonly feature: keyof Features | (keyof Features)[];

  constructor(basicDependencies: BasicDependencies, controllerConfig: ControllerConfig) {
    this.logger = basicDependencies.logger;
    this.path = controllerConfig.path;
    this.method = controllerConfig.method;
    this.feature = controllerConfig.feature;
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes(): void {
    /**
     * @openapi
     * /api/config:
     *  get:
     *     tags:
     *     - system
     *     description: Get a config file of app
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *
     */
    this.router[this.method](this.path, this.sendConfigFile);
  }

  private sendConfigFile = (_req: Request, res: Response): Response<any> => {
    this.logger.info('fetching config file', ConfigController.name);
    return res.send({ features });
  };
}

export default ConfigController;

// const axios = require('axios').default;

// // axios.get('http://api.ipstack.com/178.37.80.117?access_key=0f7ba6f6d09ad93440d332fc09e3f071').then((data) => {
// //     console.log("data", data.data)
// // })
// axios.get('http://api.ipstack.com/check?access_key=0f7ba6f6d09ad93440d332fc09e3f071').then((data) => {
//   console.log('data', data.data);
// });
