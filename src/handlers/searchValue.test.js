import { enterSearchValue } from './searchValue';
import { handleFieldsPrompt } from './searchField';
import { getUsers } from '../models/user';
import { displayFieldSelectionPrompt } from '../views/views';
import { searchHandler } from './search';

import { quit } from './quit';

jest.mock('../models/user');
jest.mock('../views/views');
jest.mock('./searchField');
jest.mock('./search');
jest.mock('./quit');

beforeEach(() => {
  getUsers.mockClear();
  handleFieldsPrompt.mockClear();
  displayFieldSelectionPrompt.mockClear();
  searchHandler.mockClear();
  quit.mockClear();
});

test('calls search handler with a valid search value', async () => {
  await enterSearchValue(
    { value: '1' },
    'id',
    getUsers,
    ['name'],
    ['id', 'name']
  );

  expect(searchHandler).toHaveBeenCalledTimes(1);
});

test('can go back to search field selection', async () => {
  displayFieldSelectionPrompt.mockImplementationOnce(() =>
    Promise.resolve({ field: 'id' })
  );

  await enterSearchValue(
    { value: '!f' },
    'id',
    getUsers,
    ['name'],
    ['id', 'name']
  );

  expect(handleFieldsPrompt).toHaveBeenCalledTimes(1);
});

test('quit', async () => {
  await enterSearchValue(
    { value: '!q' },
    'id',
    getUsers,
    ['name'],
    ['id', 'name']
  );

  expect(quit).toHaveBeenCalledTimes(1);
});
