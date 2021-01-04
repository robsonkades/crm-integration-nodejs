import { isEqual } from 'date-fns';

import ServiceException from '@shared/errors/ServiceException';

import IOrder from '../../dtos/IOrder';
import IOrderRepository, { Full, PaginationProps } from '../IOrderRepository';

class FakeOrderRepository implements IOrderRepository {
  orders: Full<IOrder>[] = [];

  listOrders(_: PaginationProps): Promise<Full<IOrder[]>> {
    return Promise.resolve(this.orders);
  }

  update(order: { id: string; date: Date; value: number }): Promise<IOrder> {
    const alreadyOrder = this.orders.find(item => item.id === order.id);

    if (alreadyOrder) {
      Object.assign(alreadyOrder, {
        date: order.date,
        value: order.value,
      });

      return Promise.resolve(alreadyOrder);
    }

    throw new ServiceException({
      message: "Order doens't found",
      statusCode: 400,
    });
  }

  create({ date, value }: IOrder): Promise<IOrder> {
    const id = String(Date.now());
    this.orders.push({ id, date, value });
    return Promise.resolve({ id, date, value });
  }

  findByDate(date: Date): Promise<Full<IOrder> | undefined> {
    const order = this.orders.find(item => isEqual(item.date, date));

    if (order) {
      return Promise.resolve(order);
    }

    return Promise.resolve(undefined);
  }
}

export default FakeOrderRepository;
