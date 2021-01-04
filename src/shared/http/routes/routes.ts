import { Router } from 'express';

import integrationRouter from '@modules/integration/infra/http/routes/integration.router';
import orderRouter from '@modules/order/infra/http/routes/order.router';

import docs from '../../../docs';

const routes = Router();

routes.use('/integration', integrationRouter);
routes.use('/orders', orderRouter);
routes.get('/api-docs', (_, response) => {
  return response.json(JSON.parse(docs));
});

export default routes;
