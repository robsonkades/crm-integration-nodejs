import mongoose from 'mongoose';

import * as logs from './logs';

class Database {
  constructor() {
    this.init();
  }

  init() {
    const uri =
      'mongodb+srv://robsonkades:6waySHuz9qrNV033@cluster0.gu0tb.mongodb.net/orders?retryWrites=true&w=majority';
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .catch(e => logs.error(e));
  }
}

export default new Database();
