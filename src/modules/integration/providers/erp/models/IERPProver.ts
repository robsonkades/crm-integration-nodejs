export interface IOrder {
  title: string;
  amount: number;
}

export interface ICountOrderByDate {
  data: string;
  total: number;
}

export default interface IERPProvider {
  saveOrder(data: IOrder): Promise<void>;
  listOrdersByDate(date: string): Promise<Array<ICountOrderByDate>>;
}
