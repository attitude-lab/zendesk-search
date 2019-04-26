import { concat } from 'lodash';

import { choices, displayFieldSelectionPrompt } from '../views/views';
import { quit } from './quit';
import { handleFieldsPrompt } from './searchField';

import {
  getUsers,
  userFields,
  userPartialSearchableFields
} from '../models/user';
import {
  getOrganizations,
  organizationFields,
  organizationPartialSearchableFields
} from '../models/organization';
import {
  getTickets,
  ticketFields,
  ticketPartialSearchableFields
} from '../models/ticket';

const appendNavigation = fields =>
  concat(fields, [choices.navigation.main, choices.navigation.quit]);

export const handleMainPrompt = ({ main }) => {
  switch (main) {
  case choices.facet.users:
    displayFieldSelectionPrompt(appendNavigation(userFields)).then(answer =>
      handleFieldsPrompt(
        answer,
        getUsers,
        userPartialSearchableFields,
        appendNavigation(userFields)
      )
    );
    break;
  case choices.facet.tickets:
    displayFieldSelectionPrompt(appendNavigation(ticketFields)).then(answer =>
      handleFieldsPrompt(
        answer,
        getTickets,
        ticketPartialSearchableFields,
        appendNavigation(ticketFields)
      )
    );
    break;
  case choices.facet.organizations:
    displayFieldSelectionPrompt(appendNavigation(organizationFields)).then(
      answer =>
        handleFieldsPrompt(
          answer,
          getOrganizations,
          organizationPartialSearchableFields,
          appendNavigation(organizationFields)
        )
    );
    break;
  case choices.navigation.quit:
    quit();
    break;
  }
};
