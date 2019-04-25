import { renderToConsole } from '../console/console';
import { displayEnterValuePrompt } from '../views/views';
import { enterSearchValue } from './searchValue';

export const searchHandler = async (
  field,
  value,
  dbFunc,
  partialSearchableFields,
  fields
) => {
  let query = {};
  partialSearchableFields.includes(field) && value
    ? (query[field] = new RegExp(value, 'i'))
    : (query[field] = value);

  const results = await dbFunc(query); // Get result synchronously so that console log doesn't overlap the next search prompt

  if (results) {
    renderToConsole(results);
  }

  displayEnterValuePrompt().then(answer =>
    enterSearchValue(answer, field, dbFunc, partialSearchableFields, fields)
  );
};
