export enum DealStatus {
  OPEN = 'open',
  WON = 'won',
  LOST = 'lost',
  DELETED = 'deleted',
}

export interface Deal {
  id: number;
  title: string;
  currency: string;
  value: number;
  status: DealStatus;
  won_time: string;
}

export default interface ICRMProvider {
  listDeals(): Promise<Array<Deal>>;
}
