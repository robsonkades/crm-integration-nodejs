import { container } from 'tsyringe';

import * as logs from '@config/logs';

import IDeal from '../dtos/IDeal';
import CreateOrderService from './CreateOrder.service';

class ProcessDealsService {
  async execute(deals: Array<IDeal>): Promise<void> {
    const createOrderService = container.resolve(CreateOrderService);
    try {
      const orders = deals.map(({ value, title }) =>
        createOrderService.execute({ title, amount: value }),
      );
      await Promise.all(orders);
    } catch (error) {
      logs.error(error);
    }
  }
}

export default new ProcessDealsService();
