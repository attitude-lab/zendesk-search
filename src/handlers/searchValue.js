import { choices, displayFieldSelectionPrompt } from '../views/views';
import { quit } from './quit';
import { searchHandler } from './search';
import { handleFieldsPrompt } from './searchField';

export const enterSearchValue = (
  { value },
  field,
  dbFunc,
  partialSearchableFields,
  fields
) => {
  switch (value) {
  case choices.navigation.q:
    quit();
    break;
  case choices.navigation.f:
    displayFieldSelectionPrompt(fields).then(answer =>
      handleFieldsPrompt(answer, dbFunc, partialSearchableFields, fields)
    );
    break;
  default:
    searchHandler(field, value, dbFunc, partialSearchableFields, fields);
  }
};
