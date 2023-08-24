const { Schema, model } = require('mongoose');

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
        get: (createdAtTCT) => dateFormat(createdAtTCT)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {

})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;