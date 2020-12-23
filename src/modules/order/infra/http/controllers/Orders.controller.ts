import { Request, Response } from 'express';

import ListOrdersService from '../../../services/ListOrders.service';

class OrdersController {
  async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const pageNumber = Number(page) || 0;
    const orders = await ListOrdersService.execute(pageNumber);
    return response.json(orders);
  }
}

export default OrdersController;
