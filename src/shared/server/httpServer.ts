// eslint-disable-next-line no-unused-vars
import express from 'express';
// import MiddlewareOptionsBuilder from '../options/middleware_options';
import { Config, ICollection } from './types';
// import RestMethod from '../enums/rest_method';
// import { ILogger } from '@yoda-tmh/tmh-node-logger';

export default class HttpServer {
  private app: express.Application;
  // private _log: ILogger;
  private config: Config;
  // private _middlewareOptions: MiddlewareOptionsBuilder;

  constructor(config: Config) {
    this.config = config;
    // this._log = logger;
    // this._middlewareOptions = middlewareOptions;
    // this._log.info(`Server environment: ${this._config.get<string>('env')}`, HttpServer.name);
    // this._app = this._middlewareOptions.build();
    this.app = express();
    // this._log.info('Server setup done', HttpServer.name);
  }

  // public initializeControllers = (controllers: IController[]): void => {
  //   controllers.forEach((controller)=> {
  //     console.log('route', `${controller.method}/${controller.path}`);
  //     this.app.use('/', controller.router);
  //   });
  //   console.log('Endpoints setup done', HttpServer.name);
  // }

  public initializeControllers = (collections: ICollection[]): void => {
    collections.forEach((collection) => {
      collection.addControllers(this.app);
    });
    console.log('Endpoints setup done');
  };

  /**
   * Create a HTTP endpoint.
   * @param {number} method - The API method type.
   * @param {object} uri - The API endpoint url.
   * @param {callback} cbs - The API method.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  //  public addApiRoute = (method: RestMethod, uri: string, cbs: any): void=> {
  //    const prefixedUri = `/api${uri}`;
  //    const info = `Added route: [${method}] ${prefixedUri}`;
  //    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //    // @ts-ignore
  //    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //    this._app[method.toLowerCase()](prefixedUri, cbs);
  //    this._log.info(info, HttpServer.name);
  //  };

  public start = (): void => {
    //  this._log.info('Starting server...', HttpServer.name);
    this.app.listen(this.config.get('port'), () => {
      console.log(
        `${this.config.get<string>('name')} http server is listening on ${this.config.get<string>('port')}`,
        HttpServer.name
      );
    });
  };
}
