import winston from 'winston';
import { ILogger, LogLevel, LoggerConfig } from './types';

export default class WinstonLogger implements ILogger {
  public logger: winston.Logger;
  public readonly defaultContext = 'Winston';

  constructor(loggerConfig: LoggerConfig) {
    const logFileName = `${loggerConfig.config.get<string>('logs_path')}/${loggerConfig.config.get<string>(
      'name'
    )}-${loggerConfig.config.get<string>('env')}.log`;
    const transports = {
      file: new winston.transports.File({ filename: logFileName, level: 'info', handleExceptions: true })
    };
    const loggerOptions: winston.LoggerOptions = {
      format: winston.format[loggerConfig.fileFormat](),
      transports: [transports.file],
      level: loggerConfig.fileLevel
    };

    this.logger = winston.createLogger(loggerOptions);

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format[loggerConfig.consoleFormat]()
        })
      );
    }
  }

  public log(level: LogLevel, msg: string, obj: object, context?: string): void {
    this.logger.log(level, `[${context ?? this.defaultContext}] ${msg}`, obj);
  }

  public trace(msg: string, context?: string): void {
    this.logger.info(msg, { meta: `[${context ?? this.defaultContext}]` });
  }

  public traceObject(obj: object, msg: string, context?: string) {
    this.logger.info({
      context: context ?? this.defaultContext,
      message: msg,
      obj
    });
  }

  public info(msg: string, context?: string): void {
    this.logger.info(msg, { meta: `[${context ?? this.defaultContext}]` });
  }

  public infoObject(obj: unknown, context?: string): void {
    this.logger.info(`[${context ?? this.defaultContext}]`, obj);
  }

  public warn(msg: string, context?: string): void {
    this.logger.warn(msg, { meta: `[${context ?? this.defaultContext}]` });
  }

  public warnObject(obj: object, msg: string, context?: string): void {
    this.logger.warn({
      context: context ?? this.defaultContext,
      message: msg,
      obj
    });
  }

  public error(msg: string, context?: string): void {
    this.logger.error(msg, { meta: `[${context ?? this.defaultContext}]` });
  }

  public errorObject(obj: unknown, msg?: string, context?: string): void {
    this.logger.error(`[${context ?? this.defaultContext}] ${msg}`, obj);
  }

  public exception(ex: Error, context?: string): void {
    this.logger.error(`[${context ?? this.defaultContext}]`, ex);
  }
}
