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

export default model<IOrder>('Order', schema);
