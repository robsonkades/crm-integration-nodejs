import { startOfDay } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import CreateOrUpdateOrderService from '@modules/order/services/CreateOrUpdateOrder.service';

import ICountOrderByDate from '../dtos/ICountOrderByDate';
import IERPProvider from '../providers/erp/models/IERPProvider';
import ListOrdersByDateService from './ListOrdersByDate.service';

@injectable()
class UpdateAggregationOrdersService {
  constructor(
    @inject('ERPProvider')
    private erpProvider: IERPProvider | IERPProvider,

    @inject('OrderRepository')
    private orderRepository: IOrderRepository | IOrderRepository,
  ) {}

  async execute(): Promise<ICountOrderByDate | undefined> {
    const date = startOfDay(new Date(Date.now()));

    const listOrdersByDateService = new ListOrdersByDateService(
      this.erpProvider,
    );

    const createOrUpdateOrderService = new CreateOrUpdateOrderService(
      this.orderRepository,
    );

    const orders = await listOrdersByDateService.execute(date);

    if (orders.length) {
      const orderAggregate = orders.reduce(
        ({ data, total }: ICountOrderByDate, current: ICountOrderByDate) => {
          return {
            data,
            total: total + current.total,
          };
        },
      );

      await createOrUpdateOrderService.execute({
        date,
        total: orderAggregate.total,
      });

      return orderAggregate;
    }

    return Promise.resolve(undefined);
  }
}

export default UpdateAggregationOrdersService;
