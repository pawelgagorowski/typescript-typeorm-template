import { Request, Response, Router } from 'express';
import ApiPath from '../shared/config/api';
import { Features, features } from '../shared/config/features';
import { IController, HttpMethods } from '../shared/server/types';

class GetConfigFileController implements IController {
  public path: ApiPath;
  public method: HttpMethods;
  public feature: keyof Features | (keyof Features)[];
  public router: Router;

  constructor() {
    this.path = ApiPath.CONFIG;
    this.method = 'get';
    this.feature = 'config';
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(this.path, this.sendConfigFile);
  }

  private sendConfigFile(_req: Request, res: Response): Response<any> {
    return res.send({ features });
  }
}

export default GetConfigFileController;
