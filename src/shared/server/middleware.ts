import express, { Application } from 'express';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import responseTime from 'response-time';
import client from 'prom-client';
import helmet, { HelmetOptions } from 'helmet';
import { restResponseTimeHistogram, counter } from './prometheusMetrics';
import { ILogger } from '../config/logger/types';
import { SwaggerConfig } from './types';

class MiddlewareOptionsBuilder {
  public readonly appInstance: Application;
  public readonly logger: ILogger;

  constructor(logger: ILogger) {
    this.appInstance = express();
    this.logger = logger;
  }

  public useBodyParser = (
    urlencodedOptions?: bodyParser.OptionsUrlencoded,
    jsonOptions?: bodyParser.OptionsJson
  ): void => {
    this.appInstance.use(bodyParser.urlencoded(urlencodedOptions ?? { extended: true, limit: '50kb' }));
    this.appInstance.use((req, res, next) =>
      bodyParser.json(jsonOptions ?? { limit: '50kb' })(req, res, (error) => {
        if (error) {
          this.logger.errorObject({ error, type: 'bodyParser', date: new Date() }, error.message);
          return res.status(400).json({ result: { message: 'Incorrect request.' } });
        }
        return next();
      })
    );
  };

  public useSwagger = (config?: SwaggerConfig) => {
    const defaultOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Express Starter Pack',
          version: '1.0.0'
        }
      },
      apis: ['*']
    };

    const options = {
      ...defaultOptions,
      ...config
    };

    const swaggerSpec = swaggerJsdoc(options);
    this.appInstance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };

  public useHelmet = (options?: HelmetOptions) => {
    this.appInstance.use(helmet(options));
  };

  public usePrometheusMetrics = () => {
    this.appInstance.use(
      responseTime((req: express.Request, res: express.Response, time: number) => {
        counter.inc();

        if (req.route?.path) {
          restResponseTimeHistogram.observe(
            {
              method: req.method,
              route: req.route.path,
              status_code: res.statusCode
            },
            time * 1000
          );
        }
      })
    );

    const { collectDefaultMetrics } = client;
    collectDefaultMetrics();

    this.appInstance.get('/metrics', async (_req, res) => {
      res.set('Content-Type', client.register.contentType);

      return res.send(await client.register.metrics());
    });
  };

  public useDefaultOptions = (): void => {
    this.useHelmet();
    this.useBodyParser();
  };

  public build = (): Application => this.appInstance;
}

export default MiddlewareOptionsBuilder;
