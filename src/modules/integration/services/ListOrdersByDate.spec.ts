import BlingProvider from '../providers/erp/implementations/BlingProvider';
import ListOrdersByDateService from './ListOrdersByDate.service';

describe('ListOrdersByDateService', () => {
  it('should be able to list orders by date', async () => {
    const blingProvider = new BlingProvider();
    const listOrdersByDateService = new ListOrdersByDateService(blingProvider);

    const date = new Date('2020-05-05');

    const mockBling = jest
      .spyOn(blingProvider, 'listOrdersByDate')
      .mockImplementationOnce(() => {
        return Promise.resolve([]);
      });

    await listOrdersByDateService.execute(date);

    expect(mockBling.mock.calls[0]).toEqual(['04/05/2020']);
  });
});
