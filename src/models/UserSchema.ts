import mongoose, { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    
    creationDate:{
        type: Date,
        default: Date.now()
    },
    deletionDate:{
        type: Date,
        default: null
    },
    lastUpdated:{
        type: Date,
        default: Date.now(),
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    devicesLinked: [{
        type: Schema.Types.ObjectId,
        ref: 'Device',
    }]
})

export const User = mongoose.model("Account", UserSchema)

module.exports = User;