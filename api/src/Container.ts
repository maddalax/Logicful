import Bottle from 'bottlejs';
import { ConfigProvider } from './config/ConfigProvider';
import { Mediator } from './infrastructure/event/Mediator';
import { ConsoleLogger } from './infrastructure/logging/Logger';
import { Database } from './infrastructure/persistence/Database';

const bottle : Bottle = new Bottle();

export enum Service {
  Database,
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
registry.register(Service.Database, Database, Service.Config);

export default registry;