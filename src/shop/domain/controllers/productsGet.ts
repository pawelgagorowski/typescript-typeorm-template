import { Request, Response, Router } from 'express';
import { ILogger } from '@config/logger/types';
import { Features } from '@config/features';
import { IController, HttpMethod, ApiPath, BasicDependencies, ControllerConfig } from '@server/types';
import BasicControllerMiddlewares from '@server/controller';
import jsonMapper from '@helpers/jsonMapper';
import ProductDto from '@shop/models/productDto';
import shopPostgresAdapter from '../../adapters/postgresqlAdapter';
import { fetchProducts } from '../ports/persistence';

class GetProductsController extends BasicControllerMiddlewares implements IController {
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
    this.router[this.method](this.path, this.authorizeToken('authorization'), this.getProducts);
  };

  public getProducts = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.user;
    const products = await fetchProducts<{ products_descriptions: string }>(shopPostgresAdapter, userId);
    if (products === null) return res.json({ message: 'there was problem with products fetching' });
    const deserializedProducts = products.map((product) => jsonMapper(ProductDto, product));
    return res.json({ message: deserializedProducts });
  };
}

export default GetProductsController;
