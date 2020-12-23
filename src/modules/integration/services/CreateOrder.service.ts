import { inject, injectable } from 'tsyringe';

import IOrder from '../dtos/IOrder';
import IERPProver from '../providers/erp/models/IERPProver';

@injectable()
class CreateOrderService {
  constructor(
    @inject('ERPProver')
    private erpProvider: IERPProver | IERPProver,
  ) {}

  async execute({ title, amount }: IOrder): Promise<void> {
    await this.erpProvider.saveOrder({ title, amount });
  }
}

export default CreateOrderService;
