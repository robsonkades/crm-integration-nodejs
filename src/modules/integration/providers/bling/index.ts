import axios from 'axios';

interface IBlingOrder {
  title: string;
  amount: number;
}

interface IPagination {
  page: number;
}

export interface IOrder {
  data: string;
  total: number;
}

export interface IOrderResponse {
  pedido: {
    data: string;
    totalvenda: string;
  };
}

interface IOrders {
  retorno: {
    pedidos?: Array<IOrderResponse>;
    erros?: Array<{
      erro: {
        cod: number;
        msg: string;
      };
    }>;
  };
}

export default {
  saveOrder: async ({ title, amount }: IBlingOrder): Promise<void> => {
    const id = Math.floor(Math.random() * 999999999);
    const xml = `
    <?xml version='1.0'?>
    <pedido>
        <cliente>
            <nome>${title} teste hora</nome>
        </cliente>
        <codigo>${id}</codigo>
        <itens>
            <item>
                <codigo>deal</codigo>
                <vlr_unit>${amount}</vlr_unit>
                <qtde>1</qtde>
            </item>
        </itens>
    </pedido>`;

    const api_key =
      '0b47417f6dd816521e73d28cabc89015a57c11cb0b698329bbd082f3848e15a3c68dbf6a';

    await axios.post(
      `https://bling.com.br/Api/v2/pedido/json/`,
      {},
      {
        params: {
          apikey: api_key,
          xml,
        },
      },
    );
  },
  listOrdersByDate: async (date: string): Promise<Array<IOrder>> => {
    const orders: Array<IOrder> = [];
    const fetch = async ({ page }: IPagination): Promise<void> => {
      const api_key =
        '0b47417f6dd816521e73d28cabc89015a57c11cb0b698329bbd082f3848e15a3c68dbf6a';

      const response = await axios.get<IOrders>(
        `https://bling.com.br/Api/v2/pedidos/page=${page}/json/`,
        {
          params: {
            filters: `dataEmissao[${date} TO ${date}]`,
            apikey: api_key,
          },
        },
      );

      const { retorno } = response.data;

      if (retorno.pedidos) {
        const ordersData = retorno.pedidos.map(({ pedido }) => {
          return {
            data: pedido.data,
            total: Number(pedido.totalvenda),
          };
        });

        orders.push(...ordersData);

        await fetch({ page: page + 1 });
      }
    };

    await fetch({ page: 1 });

    return orders;
  },
};
