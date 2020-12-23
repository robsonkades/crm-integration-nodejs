import { format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IERPProver, {
  ICountOrderByDate,
} from '../providers/erp/models/IERPProver';

@injectable()
class ListOrdersCurrentDayService {
  constructor(
    @inject('ERPProver')
    private erpProvider: IERPProver | IERPProver,
  ) {}

  async execute(day: Date): Promise<ICountOrderByDate[]> {
    const date = format(day, 'dd/MM/yyyy');
    return this.erpProvider.listOrdersByDate(date);
  }
}

export default ListOrdersCurrentDayService;
