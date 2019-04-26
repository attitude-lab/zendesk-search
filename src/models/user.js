import mongoose from 'mongoose';
import { handleCastError } from './errorHandler';
import { openConnectionExecute } from '../db/queryExecutor';

const numberPath = {
  _id: Number,
  organization_id: Number
};

const stringPath = {
  url: String,
  external_id: String,
  name: String,
  alias: String,
  locale: String,
  timezone: String,
  email: String,
  phone: String,
  signature: String,
  role: String,
  created_at: String,
  last_login_at: String
};

const booleanPath = {
  active: Boolean,
  verified: Boolean,
  shared: Boolean,
  suspended: Boolean
};
const stringArrayPath = {
  tags: [String]
};

const path = {
  ...numberPath,
  ...stringPath,
  ...booleanPath,
  ...stringArrayPath
};

const userSchema = mongoose.Schema(path, { collection: 'user', id: false });

userSchema.index({ _id: 1, organization_id: 1, name: 1 });

userSchema
  .virtual('organization', {
    ref: 'Organization',
    localField: 'organization_id',
    foreignField: '_id',
    justOne: true
  })
  .getters.unshift(v => (v ? v.name : '')); //https://github.com/Automattic/mongoose/issues/5835 not able to add virtual getter

userSchema
  .virtual('submitted_tickets', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'submitter_id',
    justOne: false
  })
  .getters.unshift(tickets =>
    tickets ? tickets.map(ticket => ticket.description) : []
  );

userSchema
  .virtual('assigned_tickets', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'assignee_id',
    justOne: false
  })
  .getters.unshift(tickets =>
    tickets ? tickets.map(ticket => ticket.description) : []
  );

userSchema.set('toObject', {
  virtuals: true
});

const userModel = mongoose.model('User', userSchema);

export const getUsers = query =>
  openConnectionExecute(
    userModel
      .find(query)
      .populate('organization', 'name')
      .populate('submitted_tickets', 'description')
      .populate('assigned_tickets', 'description')
      .catch(handleCastError)
  );
export const userFields = Object.keys(path);
export const userPartialSearchableFields = Object.keys({
  ...stringPath,
  ...stringArrayPath
});
