import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
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