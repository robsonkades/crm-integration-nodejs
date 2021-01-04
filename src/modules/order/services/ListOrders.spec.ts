import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import IOrderRepository from '../repositories/IOrderRepository';
import CreateOrUpdateOrderService from './CreateOrUpdateOrder.service';
import ListOrdersService from './ListOrders.service';

describe('ListOrders', () => {
  let fakeOrderRepository: IOrderRepository;

  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
  });

  it('should be able to list orders', async () => {
    const listOrdersService = new ListOrdersService(fakeOrderRepository);
    const createOrderService = new CreateOrUpdateOrderService(
      fakeOrderRepository,
    );

    const date = new Date('2020-05-05');

    await createOrderService.execute({
      date,
      total: 10,
    });

    await createOrderService.execute({
      date,
      total: 30,
    });

    const response = await listOrdersService.execute(0);

    expect(response[0]).toEqual(
      expect.objectContaining({
        date,
        value: 30,
      }),
    );
  });
});
