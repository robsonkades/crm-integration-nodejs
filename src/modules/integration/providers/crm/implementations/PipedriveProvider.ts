import axios from 'axios';

import IDeal from '@modules/integration/dtos/IDeal';
import IPagination from '@modules/integration/dtos/IPagination';
import IPipedriveResponse from '@modules/integration/dtos/IPipedriveResponse';

import ICRMProvider from '../models/ICRMProvider';

export default class PipedriveProvider implements ICRMProvider {
  public async listDeals(): Promise<IDeal[]> {
    const deals: IDeal[] = [];
    const fetch = async ({ page, limit }: IPagination): Promise<void> => {
      const response = await axios.get<IPipedriveResponse>(
        `https://api.pipedrive.com/v1/deals?status=won&start=${page}&limit=${limit}&api_token=3d2eaea4c8a8e1df5231176220f7b899e446c1f0`,
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
}
