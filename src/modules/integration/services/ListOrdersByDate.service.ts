import { format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ICountOrderByDate from '../dtos/ICountOrderByDate';
import IERPProvider from '../providers/erp/models/IERPProvider';

@injectable()
class ListOrdersCurrentDayService {
  constructor(
    @inject('ERPProvider')
    private erpProvider: IERPProvider | IERPProvider,
  ) {}

  async execute(day: Date): Promise<ICountOrderByDate[]> {
    const date = format(day, 'dd/MM/yyyy');
    return this.erpProvider.listOrdersByDate(date);
  }
}

export default ListOrdersCurrentDayService;
