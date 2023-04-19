import mongoose, { Schema } from 'mongoose';

const DeletedUserSchema = new mongoose.Schema({
    creationDate:{
        type: Date,
        default: Date.now()
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

const DeletedAccount = mongoose.model("DeletedAccount", DeletedUserSchema)

module.exports = DeletedAccount;