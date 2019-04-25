import figlet from 'figlet';

import logger from '../logger/logger';
import { displayMainPrompt } from '../views/views';
import { handleMainPrompt } from '../handlers/main';

jest.mock('../logger/logger');
jest.mock('figlet');
jest.mock('../views/views');
jest.mock('../handlers/main');

import { init, run } from './program';

test('display welcome message', () => {
  init();
  expect(logger.log).toHaveBeenCalledTimes(1);
  expect(figlet.textSync).toHaveBeenCalledTimes(1);
});

test('main prompt should be handled', () => {
  displayMainPrompt.mockImplementationOnce(() =>
    Promise.resolve({ answer: 1 })
  );
  run().then(result => {
    expect(result).toBeUndefined();
    expect(handleMainPrompt).toHaveBeenCalledWith({ answer: 1 });
  });
});
