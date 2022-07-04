import { Request, Response, Router } from 'express';
import { ApiPath } from '../shared/config/api';
import { Features } from '../shared/config/features';
import { IController, HttpMethods } from '../shared/server/types';

class SystemController implements IController {
  public path: ApiPath;
  public method: HttpMethods;
  public feature: keyof Features | (keyof Features)[];
  public router: Router;

  constructor() {
    this.path = ApiPath.PING;
    this.method = 'get';
    this.feature = 'ping';
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(this.path, this.ping);
  }

  private ping(_req: Request, res: Response): Response<any> {
    return res.json({ result: 'App is running' });
  }
}

export default SystemController;
