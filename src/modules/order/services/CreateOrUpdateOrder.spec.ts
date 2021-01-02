import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import ITOrderRepository from '../repositories/IOrderRepository';
import CreateOrUpdateOrderService from './CreateOrUpdateOrder.service';

describe('CreateOrUpdateOrder', () => {
  let fakeOrderRepository: ITOrderRepository;

  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
  });

  it('should be able to create new order', async () => {
    const date = new Date('2020-05-05');

    const createOrUpdateOrderService = new CreateOrUpdateOrderService(
      fakeOrderRepository,
    );
    const response = await createOrUpdateOrderService.execute({
      date,
      total: 10,
    });

    expect(response).toEqual(
      expect.objectContaining({
        date,
        value: 10,
      }),
    );
  });

  it('should be able to update order', async () => {
    const date = new Date('2020-05-05');

    const createOrUpdateOrderService = new CreateOrUpdateOrderService(
      fakeOrderRepository,
    );

    await createOrUpdateOrderService.execute({
      date,
      total: 10,
    });

    const response = await createOrUpdateOrderService.execute({
      date,
      total: 20,
    });

    expect(response).toEqual(
      expect.objectContaining({
        date,
        value: 20,
      }),
    );
  });
});
