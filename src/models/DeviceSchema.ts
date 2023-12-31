import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
    uuid: { 
        type: String, 
        unique: true
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
        required: true
    },
    powered: { 
        type: Boolean
    },
    poweredTimestamp: { 
        type: Date
    },
    connected: { 
        type: Boolean 
    },
    connectedTimestamp: { 
        type: Date
    },
    color: { 
        type: String
    },
    colorTimestamp: { 
        type: String
    },
    brightness: { 
        type: Number
    },
    brightnessTimestamp:{
        type: Date
    }
})

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;