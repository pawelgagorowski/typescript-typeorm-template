import express from 'express';
import { IController, ICollection, CollectionName } from '@server/types';
import { ILogger } from '@config/logger/types';
import useFeature from '@config/utils';

class Collection implements ICollection {
  public readonly collectionName: CollectionName;
  public readonly logger: ILogger;

  constructor(logger: ILogger, collectionName: CollectionName, private controllers: IController[]) {
    this.collectionName = collectionName;
    this.logger = logger;
  }

  public addControllers(app: express.Application): void {
    this.logger.info(`Collection name: ${this.collectionName}`, Collection.name);
    this.controllers.forEach((controller) => {
      if (useFeature(controller.feature)) {
        this.logger.info(`${controller.method} => ${controller.path}`, Collection.name);
        app.use('/', controller.router);
      }
    });
  }
}

export default Collection;
