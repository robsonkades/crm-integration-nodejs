import { Document, model, Schema } from 'mongoose';

interface IOrder extends Document {
  date: Date;
  value: number;
}

const schema = new Schema({
  date: {
    type: Date,
    required: true,
    indexes: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Order = model<IOrder>('Order', schema);

export default Order;

export { IOrder };
