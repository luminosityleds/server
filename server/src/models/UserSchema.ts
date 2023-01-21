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

const DeviceSchema = new mongoose.Schema({
    uuid: { 
        type: String, 
        unique: true
    },
    powered: { 
        type: Boolean
    },
    powered_timestamp: { 
        type: Date 
    },
    connected: { 
        type: Boolean 
    },
    color: { 
        type: String
    },
    brightness: { 
        type: Number
     }
})

const User = mongoose.model("Account", UserSchema)
const Device = mongoose.model("Device", DeviceSchema)

module.exports = User;
module.exports = Device;