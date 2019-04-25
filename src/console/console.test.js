import { renderToConsole } from './console';
import logger from '../logger/logger';
jest.mock('../logger/logger');

beforeEach(() => {
  logger.log.mockClear();
});

test('Render document to console', () => {
  let mongooseDocuments = [
    {
      toObject: jest.fn(() => {
        return {
          a: 1
        };
      })
    }
  ];
  const expected = 'a                    1                   ';
  renderToConsole(mongooseDocuments);
  expect(logger.log).toHaveBeenCalledTimes(5);
  expect(logger.log).toHaveBeenNthCalledWith(
    1,
    '========================================================================================================================'
  );
  expect(logger.log).toHaveBeenNthCalledWith(2, '\n');
  expect(logger.log).toHaveBeenNthCalledWith(3, expected);
  expect(logger.log).toHaveBeenNthCalledWith(4, '\n');
  expect(logger.log).toHaveBeenNthCalledWith(
    5,
    '========================================================================================================================'
  );
});

test('Render "No results found"', () => {
  let mongooseDocuments = [];
  const expected = 'No results found';
  renderToConsole(mongooseDocuments);
  expect(logger.log).toHaveBeenCalledWith(expected);
});

test('Render perserve new lines for array properties', () => {
  let mongooseDocuments = [
    {
      toObject: jest.fn(() => {
        return {
          tags: [1]
        };
      })
    }
  ];
  const expected = 'tags                 1                   ';

  renderToConsole(mongooseDocuments);
  expect(logger.log).toHaveBeenCalledTimes(5);
  expect(logger.log).toHaveBeenNthCalledWith(
    1,
    '========================================================================================================================'
  );
  expect(logger.log).toHaveBeenNthCalledWith(2, '\n');
  expect(logger.log).toHaveBeenNthCalledWith(3, expected);
  expect(logger.log).toHaveBeenNthCalledWith(4, '\n');
  expect(logger.log).toHaveBeenNthCalledWith(
    5,
    '========================================================================================================================'
  );
});
