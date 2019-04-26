import { searchHandler } from './search';
import { getUsers } from '../models/user';
import { renderToConsole } from '../console/console';
import { displayEnterValuePrompt } from '../views/views';
import { enterSearchValue } from './searchValue';

jest.mock('../models/user');
jest.mock('../console/console');
jest.mock('../views/views');
jest.mock('./searchValue');

beforeEach(() => {
  getUsers.mockClear();
  renderToConsole.mockClear();
  displayEnterValuePrompt.mockClear();
  enterSearchValue.mockClear();
});

test('search string field and render to console', async () => {
  displayEnterValuePrompt.mockImplementationOnce(() =>
    Promise.resolve({ value: 1 })
  );
  getUsers.mockImplementationOnce(() =>
    Promise.resolve('some results from db')
  );
  await searchHandler('name', 'aaa', getUsers, ['name'], ['id', 'name']);
  expect(renderToConsole).toHaveBeenCalledTimes(1);
});

test('search int field and render to console', async () => {
  displayEnterValuePrompt.mockImplementationOnce(() =>
    Promise.resolve({ value: 1 })
  );
  getUsers.mockImplementationOnce(() =>
    Promise.resolve('some results from db')
  );
  await searchHandler('id', 1, getUsers, ['name'], ['id', 'name']);

  expect(renderToConsole).toHaveBeenCalledTimes(1);
});

test('allow entering search value after rendering results', async () => {
  displayEnterValuePrompt.mockImplementationOnce(() =>
    Promise.resolve({ value: 1 })
  );
  getUsers.mockImplementationOnce(() =>
    Promise.resolve('some results from db')
  );
  await searchHandler('id', 1, getUsers, ['name'], ['id', 'name']);
  await displayEnterValuePrompt();
  expect(enterSearchValue).toHaveBeenCalledTimes(1);
});
