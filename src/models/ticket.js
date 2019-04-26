import mongoose from 'mongoose';
import { handleCastError } from './errorHandler';
import { openConnectionExecute } from '../db/queryExecutor';

const stringPath = {
  _id: String,
  url: String,
  external_id: String,
  type: String,
  subject: String,
  description: String,
  priority: String,
  status: String,
  via: String,
  created_at: String,
  due_at: String
};

const stringArrayPath = {
  tags: [String]
};

const numberPath = {
  submitter_id: Number,
  assignee_id: Number,
  organization_id: Number
};

const booleanPath = {
  has_incidents: Boolean
};

const path = {
  ...stringPath,
  ...numberPath,
  ...booleanPath,
  ...stringArrayPath
};

const ticketSchema = mongoose.Schema(path, { collection: 'ticket', id: false });

ticketSchema.index({
  submitter_id: 1,
  assignee_id: 1,
  description: 1,
  status: 1
});

ticketSchema
  .virtual('submitter', {
    ref: 'User',
    localField: 'submitter_id',
    foreignField: '_id',
    justOne: true
  })
  .getters.unshift(user => (user ? user.name : ''));

ticketSchema
  .virtual('assignee', {
    ref: 'User',
    localField: 'assignee_id',
    foreignField: '_id',
    justOne: true
  })
  .getters.unshift(user => (user ? user.name : ''));

ticketSchema
  .virtual('organization', {
    ref: 'Organization',
    localField: 'organization_id',
    foreignField: '_id',
    justOne: true
  })
  .getters.unshift(org => (org ? org.name : ''));

ticketSchema.set('toObject', { virtuals: true });

const ticketModel = mongoose.model('Ticket', ticketSchema);

export const getTickets = query =>
  openConnectionExecute(
    ticketModel
      .find(query)
      .populate('submitter', 'name')
      .populate('assignee', 'name')
      .populate('organization', 'name')
      .catch(handleCastError)
  );

export const ticketFields = Object.keys(path);
export const ticketPartialSearchableFields = Object.keys({
  ...stringPath,
  ...stringArrayPath
});
