import mongoose from 'mongoose';

import * as logs from './logs';

class Database {
  constructor() {
    this.init();
  }

  init() {
    const uri = process.env.MONGO_URL || '';
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
