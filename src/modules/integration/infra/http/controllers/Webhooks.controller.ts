import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWebhooksService from '@modules/integration/services/CreateWebhooks.service';
import ListWebhooksService from '@modules/integration/services/ListWebhooks.service';

class WebhooksController {
  async index(_: Request, response: Response): Promise<Response> {
    const listWebhooksService = container.resolve(ListWebhooksService);
    const webhooks = await listWebhooksService.execute();
    return response.json(webhooks);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createWebhooksService = container.resolve(CreateWebhooksService);

    const { host } = request.headers;

    await createWebhooksService.execute({
      subscription_url: `https://${host}/dev/integration/webhooks/invoke`,
      event_action: 'added',
      event_object: 'deal',
    });

    return response.status(204).json();
  }
}

export default WebhooksController;
