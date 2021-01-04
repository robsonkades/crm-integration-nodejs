import { Router } from 'express';

import ChargeController from '../controllers/Charge.controller';
import WebhooksController from '../controllers/Webhooks.controller';

const integrationRouter = Router();

const changeController = new ChargeController();
const webhooksController = new WebhooksController();

integrationRouter.post('/charge', changeController.create);
integrationRouter.get('/webhooks', webhooksController.index);
integrationRouter.post('/webhooks', webhooksController.create);

export default integrationRouter;
