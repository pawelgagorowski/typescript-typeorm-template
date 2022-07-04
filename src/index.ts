import config from 'config';
import HttpServer from './shared/server/httpServer';
// import SystemController from './system/api';
import SystemCollection from './system/collection';

const server = new HttpServer(config);
server.initializeControllers([SystemCollection]);
server.start();