import { Router } from 'express';

import ChargeController from '../controllers/Charge.controller';

const integrationRouter = Router();

const changeController = new ChargeController();

integrationRouter.post('/charge', changeController.create);

export default integrationRouter;
