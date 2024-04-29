import 'reflect-metadata';
import {Container} from 'inversify';

import {createApplicationContainer} from './app/index.js';
import Application from './app/application.js';
import {AppComponent} from './core/constants/index.js';
import {createUserContainer} from './modules/user/index.js';
import {createOfferContainer} from './modules/offer/offer.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );

  const application = mainContainer.get<Application>(AppComponent.Application);
  await application.init();
}

bootstrap();
