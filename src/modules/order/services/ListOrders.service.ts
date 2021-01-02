import { inject, injectable } from 'tsyringe';

import IOrder from '../dtos/IOrder';
import ITOrderRepository from '../repositories/IOrderRepository';

@injectable()
class ListOrdersService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: ITOrderRepository | ITOrderRepository,
  ) {}

  async execute(page: number): Promise<IOrder[]> {
    const pageSize = 10;

    return this.orderRepository.listOrders({
      limit: pageSize,
      skip: pageSize * page,
      sort: {
        date: 'desc',
      },
    });
  }
}

export default ListOrdersService;
