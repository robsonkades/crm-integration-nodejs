import SendMessageToQueue from '@shared/utils/SendMessageToQueue';

import { IDealStatus } from '../dtos/IDealStatus';
import PipedriveProvider from '../providers/crm/implementations/PipedriveProvider';
import CreateInitialChargeService from './CreateInitialCharge.service';

describe('CreateInitialChargeService', () => {
  it('should be able to create initial charge', async () => {
    const pipedriveProvider = new PipedriveProvider();
    const createInitialChargeService = new CreateInitialChargeService(
      pipedriveProvider,
    );

    jest.spyOn(pipedriveProvider, 'listDeals').mockImplementationOnce(() => {
      return Promise.resolve([
        {
          id: 1,
          title: 'user_1',
          currency: '$',
          value: 10.2,
          status: IDealStatus.WON,
          won_time: '01/01/2021',
        },
      ]);
    });

    const mockSendMessageToQueue = jest
      .spyOn(SendMessageToQueue, 'execute')
      .mockImplementationOnce(() => {
        return Promise.resolve({});
      });

    await createInitialChargeService.execute();

    expect(mockSendMessageToQueue.mock.calls[0]).toEqual([
      {
        payload: {
          id: 1,
          title: 'user_1',
          currency: '$',
          value: 10.2,
          status: 'won',
          won_time: '01/01/2021',
        },
        queue: 'CRMIntegrationProcessQueue',
      },
    ]);
  });

  it('should not be able to create initial charge if has errros to request', async () => {
    const pipedriveProvider = new PipedriveProvider();
    const createInitialChargeService = new CreateInitialChargeService(
      pipedriveProvider,
    );

    jest.spyOn(pipedriveProvider, 'listDeals').mockImplementationOnce(() => {
      return Promise.reject(new Error('This is generic error'));
    });

    const mockSendMessageToQueue = jest
      .spyOn(SendMessageToQueue, 'execute')
      .mockImplementationOnce(() => {
        return Promise.resolve({});
      });

    await createInitialChargeService.execute();

    expect(mockSendMessageToQueue.mock.calls).toEqual([]);
  });
});
