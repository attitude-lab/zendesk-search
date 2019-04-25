import inquirer from 'inquirer';
import autoComplete from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';
import { random } from 'lodash';

export const choices = {
  facet: {
    users: 'Users',
    tickets: 'Tickets',
    organizations: 'Organizations'
  },
  navigation: {
    quit: '(Quit!)',
    q: '!q',
    f: '!f',
    main: '(Main menu)'
  }
};

export const displayMainPrompt = () =>
  inquirer.prompt({
    type: 'rawlist',
    name: 'main',
    message: 'Select search options:',
    choices: [
      choices.facet.users,
      choices.facet.tickets,
      choices.facet.organizations,
      choices.navigation.quit
    ]
  });

export const fuzzSearch = selectableFields => (answers, input) => {
  input = input || '';
  return new Promise(resolve => {
    setTimeout(() => {
      const fuzzyResult = fuzzy.filter(input, selectableFields);
      resolve(fuzzyResult.map(el => el.original));
    }, random(30, 300)); // make fuzzy search a little more realistic
  });
};

export const displayFieldSelectionPrompt = selectableFields => {
  inquirer.registerPrompt('autocomplete', autoComplete);

  return inquirer.prompt({
    type: 'autocomplete',
    name: 'field',
    message: 'Select search field:',
    pageSize: 30,
    source: fuzzSearch(selectableFields)
  });
};

export const displayEnterValuePrompt = () =>
  inquirer.prompt({
    type: 'input',
    name: 'value',
    message:
      'Enter search value: (type "!q" to exit, type "!f" to select fields)'
  });
