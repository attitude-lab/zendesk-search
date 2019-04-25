import mongoose from 'mongoose';
import { handleCastError } from './errorHandler';
import { openConnectionExecute } from '../db/queryExecutor';

const stringPath = {
  name: String,
  url: String,
  external_id: String,
  details: String
};

const stringArrayPath = {
  domain_names: [String],
  tags: [String],
  created_at: String
};

const numberPath = {
  _id: Number
};

const booleanPath = {
  shared_tickets: Boolean
};

const path = {
  ...numberPath,
  ...stringPath,
  ...booleanPath,
  ...stringArrayPath
};

const organizationSchema = mongoose.Schema(path, {
  collection: 'organization',
  id: false
});

organizationSchema.index({ _id: 1, name: 1 });

organizationSchema
  .virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'organization_id',
    justOne: false
  })
  .getters.unshift(users => users.map(user => (user ? user.name : '')));

organizationSchema
  .virtual('tickets', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'organization_id',
    justOne: false
  })
  .getters.unshift(tickets =>
    tickets.map(ticket => (ticket ? ticket.description : ''))
  );

organizationSchema.set('toObject', {
  virtuals: true
});

const organizationModel = mongoose.model('Organization', organizationSchema);

export const getOrganizations = query =>
  openConnectionExecute(
    organizationModel
      .find(query)
      .populate('users', 'name')
      .populate('tickets', 'description')
      .catch(handleCastError)
  );

export const organizationFields = Object.keys(path);
export const organizationSearchableFields = Object.keys({
  ...stringPath,
  ...stringArrayPath
});
