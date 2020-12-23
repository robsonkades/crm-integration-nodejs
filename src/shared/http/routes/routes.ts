import { Router } from 'express';

import integrationRouter from '@modules/integration/infra/http/routes/integration.router';
import orderRouter from '@modules/order/infra/http/routes/order.router';

const routes = Router();

routes.use('/integration', integrationRouter);
routes.use('/orders', orderRouter);

export default routes;
