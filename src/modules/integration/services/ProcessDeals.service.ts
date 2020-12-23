import { container } from 'tsyringe';

import * as logs from '@config/logs';

import { Deal } from '../providers/crm/models/ICRMProvider';
import CreateOrderService from './CreateOrder.service';

class ProcessDealsService {
  async execute(deals: Array<Deal>): Promise<void> {
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
