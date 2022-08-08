import { Request, Response, Router } from 'express';
import { ILogger } from '@config/logger/types';
import { Features } from '@config/features';
import { IController, HttpMethod, ApiPath, BasicDependencies, ControllerConfig } from '@server/types';
import BasicControllerMiddlewares from '@server/controller';
import jsonMapper from '@helpers/jsonMapper';
import OrderDto from '@shop/models/orderDto';
import shopPostgresAdapter from '../../adapters/postgresqlAdapter';
import { fetchOrders } from '../ports/persistence';

class GetOrdersController extends BasicControllerMiddlewares implements IController {
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
    this.router[this.method](this.path, this.authorizeToken('authorization'), this.getOrders);
  };

  public getOrders = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.user;
    const orders = await fetchOrders<{ order_id: string; product_id: string; product_description: string }>(
      shopPostgresAdapter,
      userId
    );
    if (orders === null) return res.json({ message: 'there was problem with orders fetching' });
    const deserializedProducts = orders.map((order) => jsonMapper(OrderDto, order));
    return res.json({ message: deserializedProducts });
  };
}

export default GetOrdersController;
