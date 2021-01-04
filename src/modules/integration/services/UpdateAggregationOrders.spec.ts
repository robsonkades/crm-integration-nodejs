import FakeOrderRepository from '@modules/order/repositories/fakes/FakeOrderRepository';

import BlingProvider from '../providers/erp/implementations/BlingProvider';
import UpdateAggregationOrdersService from './UpdateAggregationOrders.service';

describe('UpdateAggregationOrdersService', () => {
  it('should be able to update aggregation orders', async () => {
    const blingProvider = new BlingProvider();
    const fakeOrderRepository = new FakeOrderRepository();
    const updateAggregationOrdersService = new UpdateAggregationOrdersService(
      blingProvider,
      fakeOrderRepository,
    );

    jest.spyOn(blingProvider, 'listOrdersByDate').mockImplementationOnce(() => {
      return Promise.resolve([
        {
          data: '01/01/2021',
          total: 10,
        },
        {
          data: '01/01/2021',
          total: 20,
        },
      ]);
    });

    const response = await updateAggregationOrdersService.execute();

    expect(response).toEqual({ data: '01/01/2021', total: 30 });
  });

  it('should not be able to update aggregation if non-existing orders ', async () => {
    const blingProvider = new BlingProvider();
    const fakeOrderRepository = new FakeOrderRepository();
    const updateAggregationOrdersService = new UpdateAggregationOrdersService(
      blingProvider,
      fakeOrderRepository,
    );

    jest.spyOn(blingProvider, 'listOrdersByDate').mockImplementationOnce(() => {
      return Promise.resolve([]);
    });

    const response = await updateAggregationOrdersService.execute();

    expect(response).toBeUndefined();
  });
});
