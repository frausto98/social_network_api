const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a new Thought
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // use a getter method to format the timestamp on query
        // get: (createdAtTCT) => dateFormat(createdAtTCT)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
})

// get total count of reactions
thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;