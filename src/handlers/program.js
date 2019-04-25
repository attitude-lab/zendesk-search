import figlet from 'figlet';
import chalk from 'chalk';

import logger from '../logger/logger';
import { displayMainPrompt } from '../views/views';
import { handleMainPrompt } from '../handlers/main';

export const init = () =>
  logger.log(chalk.green(figlet.textSync('Zendesk - Search')));

export const run = () => displayMainPrompt().then(handleMainPrompt);
