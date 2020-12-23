import { Document, model, Schema } from 'mongoose';

interface IOrder extends Document {
  _id: string;
  title: string;
  date: Date;
  value: number;
  currency?: string;
}

const schema = new Schema({
  title: String,
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  currency: String,
});

const Order = model<IOrder>('Order', schema);

export default Order;

export { IOrder };
