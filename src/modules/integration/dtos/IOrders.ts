import IOrderData from './IOrderData';

export default interface IOrders {
  retorno: {
    pedidos?: Array<IOrderData>;
    erros?: Array<{
      erro: {
        cod: number;
        msg: string;
      };
    }>;
  };
}
