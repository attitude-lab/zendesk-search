import { handleCastError } from './errorHandler';
import logger from '../logger/logger';

jest.mock('../logger/logger');

beforeEach(() => {
  logger.error.mockClear();
});

test('handle cast error', () => {
  const error = {
    name: 'CastError',
    path: 'id',
    kind: 'number'
  };

  handleCastError(error);

  expect(logger.error).toHaveBeenCalledTimes(1);
});

test('throw non cast error', () => {
  const error = {
    name: 'other error'
  };

  try {
    handleCastError(error);
  } catch (err) {
    expect(err).toEqual(error);
  }
});
