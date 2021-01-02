import { inject, injectable } from 'tsyringe';

import * as logs from '@config/logs';
import SendMessageToQueue from '@shared/utils/SendMessageToQueue';

import IDeal from '../dtos/IDeal';
import ICRMProvider from '../providers/crm/models/ICRMProvider';

@injectable()
class CreateInitialChargeService {
  constructor(
    @inject('CRMProvider')
    private crmProvider: ICRMProvider | ICRMProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const response = await this.crmProvider.listDeals();
      const promises = response.map(payload =>
        SendMessageToQueue.execute<IDeal>({
          payload,
          queue: 'CRMIntegrationProcessQueue',
        }),
      );
      await Promise.all(promises);
    } catch (error) {
      logs.error(error);
    }
  }
}

export default CreateInitialChargeService;
