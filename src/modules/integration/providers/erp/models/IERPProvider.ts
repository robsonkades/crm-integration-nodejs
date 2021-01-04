import ICountOrderByDate from '@modules/integration/dtos/ICountOrderByDate';
import IOrder from '@modules/integration/dtos/IOrder';

export default interface IERPProvider {
  saveOrder(data: IOrder): Promise<void>;
  listOrdersByDate(date: string): Promise<Array<ICountOrderByDate>>;
}
