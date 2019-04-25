import chalk from 'chalk';
import logger from '../logger/logger';

export const handleCastError = error => {
  if (error.name === 'CastError') {
    logger.error(
      `Field "${chalk.green(error.path)}" should be type "${chalk.green(
        error.kind
      )}"`
    );
  } else {
    throw error;
  }
};
