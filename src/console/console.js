import columnify from 'columnify';
import { isArray, mapValues } from 'lodash';

import logger from '../logger/logger';

const config = {
  minWidth: 20,
  maxWidth: 100,
  showHeaders: false,
  preserveNewLines: true
};

const printSeperator = () =>
  logger.log('='.repeat(config.minWidth + config.maxWidth));

const printNewline = () => logger.log('\n');

const makeArrayValueNewLine = obj =>
  mapValues(obj, value => (isArray(value) ? value.join('\n') : value));

const toColumn = document => {
  return columnify(makeArrayValueNewLine(document.toObject()), config);
};

const formatAsColumn = async document => {
  printSeperator();
  printNewline();
  logger.log(toColumn(document));
  printNewline();
  printSeperator();
};

export const renderToConsole = documents => {
  return documents && documents.length !== 0
    ? documents.map(doc => {
      formatAsColumn(doc);
    })
    : logger.log('No results found');
};
