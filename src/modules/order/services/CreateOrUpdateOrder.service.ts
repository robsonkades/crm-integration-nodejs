import IOrderRequest from '@modules/integration/dtos/IOrderRequest';

import Order, { IOrder } from '../infra/mongoose/schemas/Order';

class CreateOrUpdateOrderService {
  async execute({ date, total }: IOrderRequest): Promise<IOrder> {
    const alreadyExistsOrder = await Order.findOne({
      date,
    });

    if (alreadyExistsOrder) {
      return alreadyExistsOrder.updateOne({
        value: total,
      });
    }
    return Order.create({
      date,
      value: total,
    });
  }
}

export default new CreateOrUpdateOrderService();
