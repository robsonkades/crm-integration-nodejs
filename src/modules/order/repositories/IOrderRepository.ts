import IOrder from '../dtos/IOrder';

export type Full<T> = {
  [P in keyof T]-?: T[P];
};

export interface PaginationProps {
  limit: number;
  skip: number;
  sort?: {
    [key: string]: 'asc' | 'desc';
  };
}

export default interface ITOrderRepository {
  update(order: Full<IOrder>): Promise<IOrder>;
  create(data: IOrder): Promise<IOrder>;
  findByDate(date: Date): Promise<Full<IOrder> | undefined>;
  listOrders(data: PaginationProps): Promise<Full<IOrder[]>>;
}
