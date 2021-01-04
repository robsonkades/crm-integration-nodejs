import { container } from 'tsyringe';
import '@modules/integration/container';

import OrderRepository from '@modules/order/infra/mongoose/repositories/OrderRepository';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
