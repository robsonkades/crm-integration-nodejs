import { IOrder } from '../infra/mongoose/schemas/Order';

export default interface IOrderRepository {
  all(): Promise<Array<IOrder>>;
}
