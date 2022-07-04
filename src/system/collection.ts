import express from 'express';
import SystemController from './api';
import { IController, ICollection } from '../shared/server/types';
import useFeature from '../shared/config/utils';
import GetConfigFileController from './file';
import COLLECTION from '../shared/config/collections';

class Collection implements ICollection {
  public collectionName: COLLECTION;
  constructor(private controllers: IController[]) {
    this.collectionName = COLLECTION.SYSTEM;
  }

  public addControllers(app: express.Application): void {
    console.log('collection:', this.collectionName);
    this.controllers.forEach((controller) => {
      if (useFeature(controller.feature)) {
        console.log(`${controller.method} => ${controller.path}`);
        app.use('/', controller.router);
      }
    });
  }
}

export default new Collection([new SystemController(), new GetConfigFileController()]);
