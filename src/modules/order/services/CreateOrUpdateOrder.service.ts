import { inject, injectable } from 'tsyringe';

import IOrderRequest from '@modules/integration/dtos/IOrderRequest';

import IOrder from '../dtos/IOrder';
import IOrderRepository from '../repositories/IOrderRepository';

@injectable()
class CreateOrUpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository | IOrderRepository,
  ) {}

  async execute({ date, total }: IOrderRequest): Promise<IOrder> {
    const alreadyExistsOrder = await this.orderRepository.findByDate(date);

    if (alreadyExistsOrder) {
      return this.orderRepository.update({
        id: alreadyExistsOrder.id,
        value: total,
        date,
      });
    }
    return this.orderRepository.create({
      date,
      value: total,
    });
  }
}

export default CreateOrUpdateOrderService;
