import { openConnectionExecute, connectToDb } from './queryExecutor';
import Mongoose from 'mongoose';
import logger from '../logger/logger';

jest.mock('../logger/logger');
jest.mock('mongoose');

beforeEach(() => {
  logger.error.mockClear();
  Mongoose.connect.mockClear();
});

test('open connection execute model', () => {
  const db = {
    connection: {
      close: jest.fn(() => Promise.resolve('closed!'))
    }
  };
  const expectResult = { a: 1 };
  Mongoose.connect.mockImplementationOnce(() => Promise.resolve(db));

  const operation = Promise.resolve(expectResult);

  return openConnectionExecute(operation).then(results => {
    expect(results).toEqual(expectResult);
    expect(db.connection.close).toHaveBeenCalledTimes(1);
  });
});

test('error connecting to db', async () => {
  Mongoose.connect.mockImplementationOnce(() => Promise.reject('db error'));

  await connectToDb();
  expect(logger.error).toHaveBeenCalledTimes(1);
  expect(logger.error).toHaveBeenCalledWith(
    'Error connecting to MongoDB',
    'db error'
  );
});
