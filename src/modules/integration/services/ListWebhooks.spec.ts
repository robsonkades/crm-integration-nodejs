import PipedriveProvider from '../providers/crm/implementations/PipedriveProvider';
import ListWebhooksService from './ListWebhooks.service';

describe('ListWebhooksService', () => {
  it('should be able to list webhooks', async () => {
    const pipedriveProvider = new PipedriveProvider();
    const listWebhooksService = new ListWebhooksService(pipedriveProvider);

    jest.spyOn(pipedriveProvider, 'listWebhooks').mockImplementationOnce(() => {
      return Promise.resolve({
        data: [
          {
            event_action: 'action',
            event_object: 'object',
            subscription_url: 'url',
            company_id: 1,
            id: 1,
          },
        ],
      });
    });

    const response = await listWebhooksService.execute();

    expect(response).toEqual({
      data: [
        {
          event_action: 'action',
          event_object: 'object',
          subscription_url: 'url',
          company_id: 1,
          id: 1,
        },
      ],
    });
  });
});
