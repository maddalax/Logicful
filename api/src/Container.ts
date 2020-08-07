import Bottle from 'bottlejs';
import { ConfigProvider } from './config/ConfigProvider';
import { Mediator } from './infrastructure/event/Mediator';
import { Logger, ConsoleLogger } from './infrastructure/logging/Logger';

const bottle : Bottle = new Bottle();

export enum Service {
  Config,
  Mediator,
  Logger
}

export class ServiceRegistry {

  public get<T>(service : Service) {
    const key = Service[service].toString();
    return bottle.container[key] as T;
  }

  public register(service : Service, implementation : any, ...dependencies : Service[]) {
    const key = Service[service].toString();
    const names = dependencies.map(w => Service[w].toString());
    bottle.service(key, implementation, ...names);
  }
}

export const registry : ServiceRegistry = new ServiceRegistry();


registry.register(Service.Config, ConfigProvider);
registry.register(Service.Mediator, Mediator);
registry.register(Service.Logger, ConsoleLogger)

export default registry;