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
    thoughts: [thoughtSchema],
}, {

});

const User = model('user', userSchema);

module.exports = User;