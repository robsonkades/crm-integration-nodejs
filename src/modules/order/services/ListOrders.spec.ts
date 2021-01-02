import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import ITOrderRepository from '../repositories/IOrderRepository';
import ListOrdersService from './ListOrders.service';

describe('ListOrders', () => {
  let fakeOrderRepository: ITOrderRepository;

  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
  });

  it('should be able to list orders', async () => {});
});
