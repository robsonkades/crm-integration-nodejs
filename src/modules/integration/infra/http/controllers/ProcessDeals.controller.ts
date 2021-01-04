import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IDealStatus } from '@modules/integration/dtos/IDealStatus';
import ProcessDealsService from '@modules/integration/services/ProcessDeals.service';

class ProcessDealsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { current } = request.body;

    const processDealsService = container.resolve(ProcessDealsService);

    if (current.status === IDealStatus.WON) {
      const { won_time, currency, id, title, value } = current;
      await processDealsService.execute([
        {
          won_time,
          currency,
          id,
          status: IDealStatus.WON,
          title,
          value,
        },
      ]);
    }

    return response.status(204).json();
  }
}

export default ProcessDealsController;
