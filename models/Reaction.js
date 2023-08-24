const {Schema, Types} = require('mongoose');

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
        get: (createdAtTCT) => dateFormat(createdAtTCT) 
    }
}, {

})

module.exports = reactionSchema;