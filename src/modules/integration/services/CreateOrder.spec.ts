import BlingProvider from '../providers/erp/implementations/BlingProvider';
import CreateOrderService from './CreateOrder.service';

describe('CreateOrderService', () => {
  it('should be able to create order', async () => {
    const blingProvider = new BlingProvider();

    const createOrderSevice = new CreateOrderService(blingProvider);

    const mockBling = jest
      .spyOn(blingProvider, 'saveOrder')
      .mockImplementationOnce(() => {
        return Promise.resolve();
      });

    await createOrderSevice.execute({
      amount: 10,
      title: 'user_1',
    });

    expect(mockBling.mock.calls[0]).toEqual([{ title: 'user_1', amount: 10 }]);
  });
});
