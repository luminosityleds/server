import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    devices: {
        type: Array,
        required: false,
        default: [],
    },
})

const User = mongoose.model("User", UserSchema)

module.exports = User;