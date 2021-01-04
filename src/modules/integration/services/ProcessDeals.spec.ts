import { IDealStatus } from '../dtos/IDealStatus';
import BlingProvider from '../providers/erp/implementations/BlingProvider';
import ProcessDealsService from './ProcessDeals.service';

describe('ProcessDealsService', () => {
  it('should be able to process deals', async () => {
    const blingProvider = new BlingProvider();
    const processDealsService = new ProcessDealsService(blingProvider);

    const mockSaveOrder = jest
      .spyOn(blingProvider, 'saveOrder')
      .mockImplementationOnce(() => {
        return Promise.resolve();
      });

    await processDealsService.execute([
      {
        id: 1,
        title: 'user_1',
        currency: '$',
        value: 10.2,
        status: IDealStatus.WON,
        won_time: '01/01/2021',
      },
    ]);

    expect(mockSaveOrder.mock.calls[0]).toEqual([
      { title: 'user_1', amount: 10.2 },
    ]);
  });

  it('should not be able to process deals if has errors request', async () => {
    const blingProvider = new BlingProvider();
    const processDealsService = new ProcessDealsService(blingProvider);

    const mockSaveOrder = jest
      .spyOn(blingProvider, 'saveOrder')
      .mockImplementationOnce(() => {
        return Promise.reject(new Error('This is generic error'));
      });

    await processDealsService.execute([
      {
        id: 1,
        title: 'user_1',
        currency: '$',
        value: 10.2,
        status: IDealStatus.WON,
        won_time: '01/01/2021',
      },
    ]);

    expect(mockSaveOrder.mock.calls[0]).toEqual([
      { title: 'user_1', amount: 10.2 },
    ]);
  });
});
