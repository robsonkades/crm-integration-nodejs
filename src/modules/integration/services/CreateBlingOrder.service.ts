import bling from '../providers/bling';

interface IBlingOrder {
  title: string;
  amount: number;
}

class CreateBlingOrderService {
  async execute({ title, amount }: IBlingOrder): Promise<void> {
    await bling.saveOrder({ title, amount });
  }
}

export default new CreateBlingOrderService();
