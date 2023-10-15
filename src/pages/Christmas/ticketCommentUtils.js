const { ObjectId } = require('mongoose').Types;
const _ = require('lodash');
const { convertObjectIdToType } = require('../others');

const TicketComment = require('../../models/TicketComment');
const RmaTicket = require('../../models/RmaTicket');

function ticketCommentResponse(ticketComment) {
  return !ticketComment
    ? null
    : {
        ...ticketComment,
        ...convertObjectIdToType(ticketComment, ['createdBy']),
        id: ticketComment._id,
      };
}

function getSchemaAndPortals(ticketType) {
  const [Schema, portals] = {
    RMA: [RmaTicket, ['ServiceAndDistribution', 'Support']],
  }[ticketType];

  return {
    Schema,
    portals,
  };
}

async function checkTicketComment(id, userId) {
  const ticketComment = await TicketComment.findById(id)
    .select('createdBy ticketId ticketType createdAt')
    .lean();

  if (!ticketComment) {
    return {
      isSuccess: false,
      message: 'Ticket Comment not found!',
    };
  }

  if (!ticketComment.createdBy.equals(userId)) {
    return {
      isSuccess: false,
      message: 'Permission denied!',
    };
  }

  return { isSuccess: true, ticketComment };
}

function getUpdateLastSennCommentToTicket(
  portals,
  ticketCommentId,
  nextTicketCommentId
) {
  const updateData = {};
  const value = nextTicketCommentId ? ObjectId(nextTicketCommentId) : '';

  _.each(portals, portal => {
    const key = `lastSeenTicketComment.${portal}`;
    Object.assign(updateData, {
      [key]: {
        $cond: [{ $eq: [ticketCommentId, `$${key}`] }, value, `$${key}`],
      },
    });
  });

  return updateData;
}

async function updateLastSeenComment(ticketComment) {
  const { _id, ticketType, ticketId, createdAt } = ticketComment;

  const { Schema, portals } = getSchemaAndPortals(ticketType);

  const queryLastSeenComment = {};

  _.each(portals, portal => {
    Object.assign(queryLastSeenComment, {
      [`lastSeenTicketComment.${portal}`]: _id,
    });
  });

  const ticket = await Schema.findOne({
    _id: ticketId,
    ...queryLastSeenComment,
  })
    .select('_id')
    .lean();
  if (!ticket) {
    return;
  }

  // Get next ticket comment
  const nextTicketComment = await TicketComment.findOne({
    ticketId,
    createdAt: { $gt: createdAt },
  })
    .sort({ createdAt: 1 })
    .select('_id')
    .lean();

  // Update last seen comment for RMA
  const operator = nextTicketComment ? '$set' : '$unset';
  await Schema.updateOne({ _id: ticketId }, [
    {
      [operator]: getUpdateLastSennCommentToTicket(
        portals,
        _id,
        nextTicketComment?._id
      ),
    },
  ]);
}

function assignLastSeenCommentForPortals(ticketCommentId, portals = []) {
  const assignPortal = {};

  _.each(portals, portal => {
    const key = `lastSeenTicketComment.${portal}`;
    Object.assign(assignPortal, {
      [key]: { $ifNull: [`$${key}`, ObjectId(ticketCommentId)] },
    });
  });

  return assignPortal;
}

module.exports = {
  ticketCommentResponse,
  getSchemaAndPortals,
  checkTicketComment,
  updateLastSeenComment,
  assignLastSeenCommentForPortals,
};
