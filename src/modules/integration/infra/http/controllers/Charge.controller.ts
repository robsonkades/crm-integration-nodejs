import { Request, Response } from 'express';

import CreateAggregationOrdersService from '@modules/integration/services/CreateAggregationOrders.service';
import CreateBlingOrderService from '@modules/integration/services/CreateBlingOrder.service';
import CreateInitialChargeService from '@modules/integration/services/CreateInitialCharge.service';

class ChargeController {
  async create(_: Request, response: Response): Promise<Response> {
    const charges = await CreateInitialChargeService.execute();

    await CreateAggregationOrdersService.execute();

    const promises = charges.map(({ title, value }) =>
      CreateBlingOrderService.execute({
        amount: value,
        title,
      }),
    );

    await Promise.all(promises);

    return response.json();
  }
}

export default ChargeController;
