import { inject, injectable } from 'tsyringe';

import * as logs from '@config/logs';

import IDeal from '../dtos/IDeal';
import IERPProvider from '../providers/erp/models/IERPProvider';
import CreateOrderService from './CreateOrder.service';

@injectable()
class ProcessDealsService {
  constructor(
    @inject('ERPProvider')
    private erpProvider: IERPProvider | IERPProvider,
  ) {}

  async execute(deals: Array<IDeal>): Promise<void> {
    const createOrderService = new CreateOrderService(this.erpProvider);

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

export default ProcessDealsService;
