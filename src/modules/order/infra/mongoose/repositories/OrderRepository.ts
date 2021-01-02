import IOrder from '@modules/order/dtos/IOrder';
import ITOrderRepository, {
  PaginationProps,
  Full,
} from '@modules/order/repositories/IOrderRepository';

import Order from '../schemas/Order';

class OrderRepository implements ITOrderRepository {
  async update(order: {
    id: string;
    date: Date;
    value: number;
  }): Promise<IOrder> {
    await Order.updateOne({
      _id: order.id,
      date: order.date,
      value: order.value,
    });
    return {
      id: order.id,
      value: order.value,
      date: order.date,
    };
  }

  async create(data: IOrder): Promise<IOrder> {
    const { id, date, value } = await Order.create({
      date: data.date,
      value: data.value,
    });

    return {
      date,
      value,
      id,
    };
  }

  async findByDate(date: Date): Promise<Full<IOrder> | undefined> {
    const alreadyExists = await Order.findOne({ date });

    if (alreadyExists?.id) {
      return {
        id: alreadyExists.id,
        value: alreadyExists.value,
        date: alreadyExists.date,
      };
    }

    return undefined;
  }

  async listOrders({ limit, skip, sort }: PaginationProps): Promise<IOrder[]> {
    return Order.find().limit(limit).skip(skip).sort(sort).exec();
  }
}

export default OrderRepository;
