import { inject, injectable } from 'tsyringe';

import IWebhook from '../dtos/IWebhook';
import ICRMProvider from '../providers/crm/models/ICRMProvider';

@injectable()
class CreateWebhookService {
  constructor(
    @inject('CRMProvider')
    private crmProvider: ICRMProvider | ICRMProvider,
  ) {}

  async execute({
    event_action,
    event_object,
    subscription_url,
  }: IWebhook): Promise<void> {
    await this.crmProvider.createWebhook({
      event_action,
      event_object,
      subscription_url,
    });
  }
}

export default CreateWebhookService;
