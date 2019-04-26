import { handleMainPrompt } from './main';
import { handleFieldsPrompt } from './searchField';
import { quit } from './quit';
import inquirer from 'inquirer';

jest.mock('inquirer');
jest.mock('./searchField');
jest.mock('./quit');

beforeEach(() => {
  quit.mockClear();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('handle user selection', async () => {
  inquirer.prompt = jest.fn().mockResolvedValue({ field: '_id' });
  await handleMainPrompt({ main: 'Users' });
  expect(handleFieldsPrompt).toHaveBeenCalledTimes(1);
});

test('handle ticket selection', async () => {
  inquirer.prompt = jest.fn().mockResolvedValue({ field: '_id' });
  await handleMainPrompt({ main: 'Tickets' });
  expect(handleFieldsPrompt).toHaveBeenCalledTimes(1);
});

test('handle orgnization selection', async () => {
  inquirer.prompt = jest.fn().mockResolvedValue({ field: '_id' });
  await handleMainPrompt({ main: 'Organizations' });
  expect(handleFieldsPrompt).toHaveBeenCalledTimes(1);
});

test('handle quit', async () => {
  handleMainPrompt({ main: '(Quit!)' });
  expect(quit).toHaveBeenCalledTimes(1);
});
