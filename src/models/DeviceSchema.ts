import mongoose, { Schema, Document } from 'mongoose';

export interface DeviceInterface extends Document {
  uuid: string;
  lastUpdated: Date;
  powered?: boolean;
  poweredTimestamp?: Date | null;
  connected?: boolean;
  connectedTimestamp?: Date | null;
  color?: string;
  colorTimestamp?: string;
  brightness?: number;
  brightnessTimestamp?: Date | null;
}

const DeviceSchema: Schema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
    required: true,
  },
  powered: {
    type: Boolean,
  },
  poweredTimestamp: {
    type: Date,
  },
  connected: {
    type: Boolean,
  },
  connectedTimestamp: {
    type: Date,
  },
  color: {
    type: String,
  },
  colorTimestamp: {
    type: String,
  },
  brightness: {
    type: Number,
  },
  brightnessTimestamp: {
    type: Date,
  },
});

const Device = mongoose.model<DeviceInterface>('Device', DeviceSchema);

export default Device; // Export Device as default
