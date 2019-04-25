import inquirer from 'inquirer';
import {
  displayMainPrompt,
  displayFieldSelectionPrompt,
  displayEnterValuePrompt
} from './views';

jest.mock('inquirer');

beforeEach(() => {
  inquirer.prompt.mockClear();
});

test('main prompt', () => {
  displayMainPrompt();
  expect(inquirer.prompt).toHaveBeenCalledWith({
    choices: ['Users', 'Tickets', 'Organizations', '(Quit!)'],
    message: 'Select search options:',
    name: 'main',
    type: 'rawlist'
  });
});

test('field seletion prompt', () => {
  displayFieldSelectionPrompt();
  expect(inquirer.prompt).toHaveBeenCalledTimes(1);
});

test('enter value prompt', () => {
  displayEnterValuePrompt();
  expect(inquirer.prompt).toHaveBeenCalledWith({
    message:
      'Enter search value: (type "!q" to exit, type "!f" to select fields)',
    name: 'value',
    type: 'input'
  });
});
