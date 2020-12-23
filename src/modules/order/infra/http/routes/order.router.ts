import { Router } from 'express';

import OrdersController from '../controllers/Orders.controller';

const orderRouter = Router();

const ordersController = new OrdersController();

orderRouter.get('/', ordersController.index);

export default orderRouter;
