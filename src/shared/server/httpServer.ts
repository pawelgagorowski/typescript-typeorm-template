import { Application } from 'express';
import { ILogger } from '@config/logger/types';
import MiddlewareOptionsBuilder from './middleware';
import { Config, ICollection } from './types';

export default class HttpServer {
  private readonly appInstance: Application;
  private readonly logger: ILogger;
  private readonly config: Config;
  private readonly middlewareOptions: MiddlewareOptionsBuilder;

  constructor(middlewareOptions: MiddlewareOptionsBuilder, logger: ILogger, config: Config) {
    this.config = config;
    this.logger = logger;
    this.middlewareOptions = middlewareOptions;
    this.logger.info(`Server environment: ${this.config.get<string>('env')}`, HttpServer.name);
    this.appInstance = this.middlewareOptions.build();
    this.logger.info('Server setup done', HttpServer.name);
  }

  public initializeControllers = (collections: ICollection[]): void => {
    collections.forEach((collection) => {
      collection.addControllers(this.appInstance);
    });
    this.logger.info('Endpoints setup done', HttpServer.name);
  };

  public start = (): void => {
    this.appInstance.listen(this.config.get('port'), () => {
      this.logger.info(
        `${this.config.get<string>('name')} http server is listening on ${this.config.get<string>('port')}`,
        HttpServer.name
      );
    });
  };
}
