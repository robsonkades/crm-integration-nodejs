import axios from 'axios';

import IDeal from '@modules/integration/dtos/IDeal';
import IPagination from '@modules/integration/dtos/IPagination';
import IPipedriveResponse from '@modules/integration/dtos/IPipedriveResponse';
import IWebhook from '@modules/integration/dtos/IWebhook';
import IWebhooks from '@modules/integration/dtos/IWebhooks';

import ICRMProvider from '../models/ICRMProvider';

export default class PipedriveProvider implements ICRMProvider {
  BASE_URL = 'https://api.pipedrive.com/v1';

  public async listDeals(): Promise<IDeal[]> {
    const deals: IDeal[] = [];
    const fetch = async ({ page, limit }: IPagination): Promise<void> => {
      const api_token = process.env.PIPEDRIVE_TOKEN;
      const response = await axios.get<IPipedriveResponse>(
        `${this.BASE_URL}/deals?status=won&start=${page}&limit=${limit}&api_token=${api_token}`,
      );
      const { additional_data, data } = response.data;

      const dealsData = data.map(
        ({ id, title, currency, status, value, won_time }) => ({
          id,
          title,
          currency,
          status,
          value,
          won_time,
        }),
      );
      deals.push(...dealsData);
      if (additional_data.pagination.more_items_in_collection) {
        await fetch({ page: additional_data.pagination.next_start, limit });
      }
    };

    await fetch({ page: 0, limit: 1 });

    return deals;
  }

  public async listWebhooks(): Promise<IWebhooks> {
    const api_token = process.env.PIPEDRIVE_TOKEN;

    const { data } = await axios.get<IWebhooks>(
      `${this.BASE_URL}/webhooks?api_token=${api_token}`,
    );

    const response = data.data.map(
      ({ event_action, event_object, subscription_url, company_id, id }) => ({
        id,
        company_id,
        event_action,
        event_object,
        subscription_url,
      }),
    );

    return { data: response };
  }

  public async createWebhook({
    event_action,
    event_object,
    subscription_url,
  }: IWebhook): Promise<void> {
    const api_token = process.env.PIPEDRIVE_TOKEN;

    await axios.post(`${this.BASE_URL}/webhooks?api_token=${api_token}`, {
      event_action,
      event_object,
      subscription_url,
    });
  }
}
