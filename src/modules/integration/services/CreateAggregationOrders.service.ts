import { format } from 'date-fns';

import bling, { IOrder } from '../providers/bling';

class CreateAggregationOrdersService {
  async execute(): Promise<void> {
    const date = format(new Date(Date.now()), 'dd/MM/yyyy');
    const orders = await bling.listOrdersByDate(date);

    const orderAggregate = orders.reduce(
      ({ data, total }: IOrder, current: IOrder) => {
        return {
          data,
          total: total + current.total,
        };
      },
    );
  }
}

export default new CreateAggregationOrdersService();
