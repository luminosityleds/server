import mongoose, { Schema } from 'mongoose';

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

const Device = mongoose.model("Device", DeviceSchema)
module.exports = Device;