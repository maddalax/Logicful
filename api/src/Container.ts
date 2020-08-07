import { Container } from "inversify";
import { MongoService } from "./infrastructure/persistence/mongo/MongoService";
import { ConfigProvider } from "./config/ConfigProvider";
import { ConsoleLogger, Logger } from "./infrastructure/logging/Logger";
import { Mediator } from "./infrastructure/event/Mediator";

const provider = new Container();

provider.bind<MongoService>(MongoService).to(MongoService).inSingletonScope();
provider.bind<ConfigProvider>(ConfigProvider).to(ConfigProvider).inSingletonScope();
provider.bind<Logger>(Logger).to(ConsoleLogger).inSingletonScope();
provider.bind<Mediator>(Mediator).to(Mediator).inSingletonScope();

export default provider;