import { inject, injectable } from 'tsyringe';

import * as logs from '@config/logs';
import SendMessageToQueue from '@shared/utils/SendMessageToQueue';

import ICRMProvider, { Deal } from '../providers/crm/models/ICRMProvider';

@injectable()
class CreateInitialChargeService {
  constructor(
    @inject('CRMProvider')
    private crmProvider: ICRMProvider | ICRMProvider,
  ) {}

  async execute(): Promise<void> {
    try {
      const response = await this.crmProvider.listDeals();
      const promises = response.map(item =>
        SendMessageToQueue.execute<Deal>({
          payload: item,
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
