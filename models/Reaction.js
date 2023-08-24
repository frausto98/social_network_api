const {Schema, Types} = require('mongoose');
const {dateFormat} = require('../utils/helpers');

// Schema to create a new Reaction
const reactionSchema = new Schema({
    reactionID:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280
    },
    username:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        // use a getter method to format the timestamp on query
        get: (createdAtTCT) => dateFormat(createdAtTCT)
    }
}, {

})

module.exports = reactionSchema;