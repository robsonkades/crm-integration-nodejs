import { IDealStatus } from './IDealStatus';

export default interface IDeal {
  id: number;
  title: string;
  currency: string;
  value: number;
  status: IDealStatus;
  won_time: string;
}
