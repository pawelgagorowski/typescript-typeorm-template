import { IConfig } from 'config';

export type LogLevel = 'info' | 'warn' | 'error';

export type LoggerConfig = {
  config: IConfig;
  fileFormat: LogFormat;
  consoleFormat: LogFormat;
  fileLevel: LogLevel;
  consoleLevel: LogLevel;
};

export interface ILogger {
  log(level: LogLevel, msg: string, obj: object, context?: string): void;
  trace(msg: string, context?: string): void;
  traceObject(obj: unknown, msg: string, context?: string): void;
  info(msg: string, context?: string): void;
  infoObject(obj: unknown, msg: string, context?: string): void;
  warn(msg: string, context?: string): void;
  warnObject(obj: unknown, msg: string, context?: string): void;
  error(msg: string, context?: string): void;
  errorObject(obj: unknown, msg: string, context?: string): void;
  exception(ex: Error, context?: string): void;
}

export enum Context {
  General = 'general',
  InvalidSchema = 'invalidSchema',
  PostgreSql = 'postgresql',
  ConfigurationService = 'configurationService',
  Auth = 'authentication'
}

export type LogFormat = 'json' | 'simple';
