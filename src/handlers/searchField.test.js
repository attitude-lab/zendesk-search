import { handleFieldsPrompt } from './searchField';
import { getUsers } from '../models/user';
import { displayMainPrompt, displayEnterValuePrompt } from '../views/views';
import { enterSearchValue } from './searchValue';
import { handleMainPrompt } from './main';
import { quit } from './quit';

jest.mock('../models/user');
jest.mock('../views/views');
jest.mock('./searchValue');
jest.mock('./main');
jest.mock('./quit');

beforeEach(() => {
  getUsers.mockClear();
  displayMainPrompt.mockClear();
  displayEnterValuePrompt.mockClear();
  enterSearchValue.mockClear();
  handleMainPrompt.mockClear();
  quit.mockClear();
});

test('handle search field selection', async () => {
  displayEnterValuePrompt.mockImplementationOnce(() =>
    Promise.resolve({ value: 1 })
  );

  await handleFieldsPrompt(
    { field: '_id' },
    getUsers,
    ['name'],
    ['id', 'name']
  );

  expect(enterSearchValue).toHaveBeenCalledTimes(1);
});

test('navigate to main', async () => {
  displayEnterValuePrompt.mockImplementationOnce(() =>
    Promise.resolve({ value: 1 })
  );
  displayMainPrompt.mockImplementationOnce(() =>
    Promise.resolve({ main: 'Users' })
  );

  await handleFieldsPrompt(
    { field: '(Main menu)' },
    getUsers,
    ['name'],
    ['id', 'name']
  );

  expect(handleMainPrompt).toHaveBeenCalledTimes(1);
});

test('quit', async () => {
  await handleFieldsPrompt(
    { field: '(Quit!)' },
    getUsers,
    ['name'],
    ['id', 'name']
  );

  expect(quit).toHaveBeenCalledTimes(1);
});
