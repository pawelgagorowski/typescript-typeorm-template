import { Request, Response, Router } from 'express';
import { ILogger } from '@config/logger/types';
import { Features } from '@config/features';
import {
  IController,
  HttpMethod,
  ApiPath,
  BasicDependencies,
  ControllerConfig,
  ZodValidatingObject,
  ControllerMiddlewares
} from '@server/types';
import BasicControllerMiddlewares from '@server/controller';
import jsonMapper from '@helpers/jsonMapper';
import ProductDto from '@shop/models/productDto';
import { GetProductIdRequest } from '@shop/types';
import shopPostgresAdapter from '../../adapters/postgresqlAdapter';
import { fetchProduct } from '../ports/persistence';

class GetProductController extends BasicControllerMiddlewares implements IController {
  public readonly logger: ILogger;
  public readonly path: ApiPath;
  public readonly method: HttpMethod;
  public readonly feature: keyof Features | (keyof Features)[];
  public readonly router: Router;
  public readonly paramsValidation: ZodValidatingObject;

  constructor(
    basicDependencies: BasicDependencies,
    controllerConfig: ControllerConfig,
    controllerMiddlewares: ControllerMiddlewares
  ) {
    super();
    this.paramsValidation = controllerMiddlewares.paramsValidation!;
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
      this.validate(this.paramsValidation, 'params'),
      this.getProduct
    );
  };

  public getProduct = async (req: Request<GetProductIdRequest, {}, {}>, res: Response): Promise<Response> => {
    const { productId } = req.params;
    const product = await fetchProduct(shopPostgresAdapter, Number(productId));
    if (product === null) return res.json({ message: 'there was problem with product fetching' });
    const deserializedProduct = jsonMapper(ProductDto, product);
    return res.json({ message: deserializedProduct });
  };
}

export default GetProductController;
