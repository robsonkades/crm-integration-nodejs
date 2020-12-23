import { Request, Response } from 'express';

class OrdersController {
  async index(_: Request, response: Response): Promise<Response> {
    return response.status(204).json();
  }
}

export default OrdersController;
