import { Router } from 'express';

import integrationRouter from '@modules/integration/infra/http/routes/integration.router';

const routes = Router();

routes.use('/integration', integrationRouter);

export default routes;
