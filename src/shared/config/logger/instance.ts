import config from 'config';
import WinstonLogger from './winston';

const winston = new WinstonLogger({
  config,
  fileFormat: 'json',
  consoleFormat: 'simple',
  fileLevel: 'info',
  consoleLevel: 'info'
});

export default winston;
