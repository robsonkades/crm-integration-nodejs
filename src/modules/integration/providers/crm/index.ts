// import axios from 'axios';

// export enum DealStatus {
//   OPEN = 'open',
//   WON = 'won',
//   LOST = 'lost',
//   DELETED = 'deleted',
// }

// export interface Deal {
//   id: number;
//   title: string;
//   currency: string;
//   value: number;
//   status: DealStatus;
//   won_time: string;
// }

// interface IRequest {
//   data: Array<Deal>;
//   additional_data: {
//     pagination: {
//       start: number;
//       limit: number;
//       more_items_in_collection: boolean;
//       next_start: number;
//     };
//   };
// }

// interface IPagination {
//   page: number;
//   limit: number;
// }

// export default {
//   listDeals: async (): Promise<Deal[]> => {
//     const deals: Deal[] = [];
//     const fetch = async ({ page, limit }: IPagination): Promise<void> => {
//       const response = await axios.get<IRequest>(
//         `https://api.pipedrive.com/v1/deals?status=won&start=${page}&limit=${limit}&api_token=3d2eaea4c8a8e1df5231176220f7b899e446c1f0`,
//       );
//       const { additional_data, data } = response.data;

//       const dealsData = data.map(
//         ({ id, title, currency, status, value, won_time }) => ({
//           id,
//           title,
//           currency,
//           status,
//           value,
//           won_time,
//         }),
//       );
//       deals.push(...dealsData);
//       if (additional_data.pagination.more_items_in_collection) {
//         await fetch({ page: additional_data.pagination.next_start, limit });
//       }
//     };

//     await fetch({ page: 0, limit: 1 });

//     return deals;
//   },
// };

import { container } from 'tsyringe';

import PipedriveProvider from './implementations/PipedriveProvider';
import ICRMProvider from './models/ICRMProvider';

container.registerSingleton<ICRMProvider>('CRMProvider', PipedriveProvider);
