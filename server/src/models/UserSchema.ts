import mongoose, { Schema } from 'mongoose';

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
    devicesLinked: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Device'
    }]
})

const User = mongoose.model("Account", UserSchema)

module.exports = User;