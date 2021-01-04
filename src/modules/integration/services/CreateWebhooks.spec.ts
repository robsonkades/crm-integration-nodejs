import PipedriveProvider from '../providers/crm/implementations/PipedriveProvider';
import CreateWebhookService from './CreateWebhooks.service';

describe('CreateWebhooksService', () => {
  it('should be able to create webhook', async () => {
    const pipedriveProvider = new PipedriveProvider();
    const createWebhookService = new CreateWebhookService(pipedriveProvider);

    const mockCreateWebhook = jest
      .spyOn(pipedriveProvider, 'createWebhook')
      .mockImplementationOnce(() => {
        return Promise.resolve();
      });

    await createWebhookService.execute({
      event_action: 'action',
      event_object: 'object',
      subscription_url: 'url',
    });

    expect(mockCreateWebhook.mock.calls[0]).toEqual([
      {
        event_action: 'action',
        event_object: 'object',
        subscription_url: 'url',
      },
    ]);
  });
});
