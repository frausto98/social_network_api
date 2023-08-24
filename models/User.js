const { Schema, model } = require('mongoose');

// Schema to create a new user
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true, // remove white spaces
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// get total count of friends
userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length;
})


const User = model('user', userSchema);

module.exports = User;