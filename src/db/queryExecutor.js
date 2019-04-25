import logger from '../logger/logger';

import Mongoose from 'mongoose';
import config from '../config/config.dev';

export const connectToDb = () => {
  const dbHost = config.dbHost;
  const dbPort = config.dbPort;
  const dbName = config.dbName;

  return Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
    useNewUrlParser: true,
    autoIndex: false // disable on start up
  }).catch(err => {
    logger.error('Error connecting to MongoDB', err);
  });
};

export const openConnectionExecute = operation =>
  connectToDb().then(db =>
    operation.then(results => db.connection.close().then(() => results))
  );
