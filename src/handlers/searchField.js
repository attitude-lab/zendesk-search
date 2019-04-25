import {
  choices,
  displayMainPrompt,
  displayEnterValuePrompt
} from '../views/views';

import { quit } from './quit';
import { handleMainPrompt } from './main';
import { enterSearchValue } from './searchValue';

export const handleFieldsPrompt = (
  { field },
  dbFunc,
  partialSearchableFields,
  fields
) => {
  switch (field) {
  case choices.navigation.main:
    displayMainPrompt().then(handleMainPrompt);
    break;
  case choices.navigation.quit:
    quit();
    break;
  default:
    displayEnterValuePrompt().then(answer =>
      enterSearchValue(answer, field, dbFunc, partialSearchableFields, fields)
    );
  }
};
