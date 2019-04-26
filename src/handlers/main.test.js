import { handleMainPrompt } from './main';
import { handleFieldsPrompt } from './searchField';
import { quit } from './quit';
import inquirer from 'inquirer';
import { getUsers } from '../models/user';

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
  expect(handleFieldsPrompt).toHaveBeenCalledWith(
    { field: '_id' },
    getUsers,
    [
      'url',
      'external_id',
      'name',
      'alias',
      'locale',
      'timezone',
      'email',
      'phone',
      'signature',
      'role',
      'created_at',
      'last_login_at',
      'tags'
    ],
    [
      '_id',
      'organization_id',
      'url',
      'external_id',
      'name',
      'alias',
      'locale',
      'timezone',
      'email',
      'phone',
      'signature',
      'role',
      'created_at',
      'last_login_at',
      'active',
      'verified',
      'shared',
      'suspended',
      'tags',
      '(Main menu)',
      '(Quit!)'
    ]
  );
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
