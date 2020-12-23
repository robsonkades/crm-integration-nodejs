import { IOrder } from '@modules/integration/infra/mongoose/schemas/Order';

import IOrderRepository from '../IOrderRepository';

class FakeOrderRepository implements IOrderRepository {
  private orders: IOrder[] = [];

  public all(): Promise<Array<IOrder>> {
    return Promise.resolve(this.orders);
  }
}

export default FakeOrderRepository;
