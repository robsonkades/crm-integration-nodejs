import Order, { IOrder } from '../infra/mongoose/schemas/Order';

class ListOrdersService {
  async execute(page: number): Promise<IOrder[]> {
    const pageSize = 10;

    return Order.find()
      .limit(pageSize)
      .skip(pageSize * page)
      .sort({
        date: 'desc',
      })
      .exec();
  }
}

export default new ListOrdersService();
