import { startOfDay } from 'date-fns';
import { container } from 'tsyringe';

import CreateOrUpdateOrderService from '@modules/order/services/CreateOrUpdateOrder.service';

import ICountOrderByDate from '../dtos/ICountOrderByDate';
import ListOrdersByDateService from './ListOrdersByDate.service';

class UpdateAggregationOrdersService {
  async execute(): Promise<ICountOrderByDate | undefined> {
    const listOrdersByDateService = container.resolve(ListOrdersByDateService);

    const date = startOfDay(new Date(Date.now()));
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

      await CreateOrUpdateOrderService.execute({
        date,
        total: orderAggregate.total,
      });

      return orderAggregate;
    }

    return Promise.resolve(undefined);
  }
}

export default UpdateAggregationOrdersService;
