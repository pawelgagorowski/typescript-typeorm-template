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
import { CreateProductRequest } from '@shop/types';
import shopPostgresAdapter from '../../adapters/postgresqlAdapter';
import { addProduct } from '../ports/persistence';

class CreateProductController extends BasicControllerMiddlewares implements IController {
  public readonly logger: ILogger;
  public readonly path: ApiPath;
  public readonly method: HttpMethod;
  public readonly feature: keyof Features | (keyof Features)[];
  public readonly router: Router;
  public readonly bodyValidation: ZodValidatingObject;

  constructor(
    basicDependencies: BasicDependencies,
    controllerConfig: ControllerConfig,
    controllerMiddlewares: ControllerMiddlewares
  ) {
    super();
    this.bodyValidation = controllerMiddlewares.bodyValidation!;
    this.logger = basicDependencies.logger;
    this.path = controllerConfig.path;
    this.method = controllerConfig.method;
    this.feature = controllerConfig.feature;
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router[this.method](
      this.path,
      this.authorizeToken('authorization'),
      this.validate(this.bodyValidation, 'body'),
      this.createProduct
    );
  };

  public createProduct = async (req: Request<{}, {}, CreateProductRequest>, res: Response): Promise<Response> => {
    const { userId } = req.user;
    const result = await addProduct(shopPostgresAdapter, userId, req.body);
    return res.json({ message: result });
  };
}

export default CreateProductController;
