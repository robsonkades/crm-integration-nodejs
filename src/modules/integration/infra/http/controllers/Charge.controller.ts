import { Request, Response } from 'express';

import SendMessageToQueue from '@shared/utils/SendMessageToQueue';

interface IChargePayload {
  type: string;
}

class ChargeController {
  async create(_: Request, response: Response): Promise<Response> {
    await SendMessageToQueue.execute<IChargePayload>({
      payload: {
        type: 'INITIAL_CHARGE',
      },
      queue: 'CRMIntegrationInitialChargeProcessQueue',
    });

    return response.status(204).json();
  }
}

export default ChargeController;
