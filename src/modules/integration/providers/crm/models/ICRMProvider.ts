import IDeal from '@modules/integration/dtos/IDeal';
import IWebhook from '@modules/integration/dtos/IWebhook';
import IWebhooks from '@modules/integration/dtos/IWebhooks';

export default interface ICRMProvider {
  listDeals(): Promise<Array<IDeal>>;
  listWebhooks(): Promise<IWebhooks>;
  createWebhook(data: IWebhook): Promise<void>;
}
