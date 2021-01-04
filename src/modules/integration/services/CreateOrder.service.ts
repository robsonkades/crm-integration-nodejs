import { inject, injectable } from 'tsyringe';

import IOrder from '../dtos/IOrder';
import IERPProvider from '../providers/erp/models/IERPProvider';

@injectable()
class CreateOrderService {
  constructor(
    @inject('ERPProvider')
    private erpProvider: IERPProvider | IERPProvider,
  ) {}

  async execute({ title, amount }: IOrder): Promise<void> {
    await this.erpProvider.saveOrder({ title, amount });
  }
}

export default CreateOrderService;
