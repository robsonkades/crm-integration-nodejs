import { startOfDay } from 'date-fns';
import { container } from 'tsyringe';

import Order from '../../order/infra/mongoose/schemas/Order';
import { ICountOrderByDate } from '../providers/erp/models/IERPProver';
import ListOrdersByDateService from './ListOrdersByDate.service';

class UpdateAggregationOrdersService {
  async execute(): Promise<ICountOrderByDate | undefined> {
    const listOrdersByDateService = container.resolve(ListOrdersByDateService);

    const day = startOfDay(new Date(Date.now()));
    const orders = await listOrdersByDateService.execute(day);

    if (orders.length) {
      const orderAggregate = orders.reduce(
        ({ data, total }: ICountOrderByDate, current: ICountOrderByDate) => {
          return {
            data,
            total: total + current.total,
          };
        },
      );

      const alreadyExistsOrder = await Order.findOne({
        date: day,
      });

      if (alreadyExistsOrder) {
        await alreadyExistsOrder.updateOne({
          value: orderAggregate.total,
        });
      } else {
        await Order.create({
          date: day,
          value: orderAggregate.total,
        });
      }
      return orderAggregate;
    }

    return Promise.resolve(undefined);
  }
}

export default UpdateAggregationOrdersService;
