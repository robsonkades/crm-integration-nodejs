import { inject, injectable } from 'tsyringe';

import IWebhooks from '../dtos/IWebhooks';
import ICRMProvider from '../providers/crm/models/ICRMProvider';

@injectable()
class ListWebhooksService {
  constructor(
    @inject('CRMProvider')
    private crmProvider: ICRMProvider | ICRMProvider,
  ) {}

  async execute(): Promise<IWebhooks> {
    return this.crmProvider.listWebhooks();
  }
}

export default ListWebhooksService;
