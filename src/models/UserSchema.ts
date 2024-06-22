import mongoose, { Schema, Document } from 'mongoose';
import { DeviceInterface } from './DeviceSchema'; // Import DeviceInterface

export interface UserInterface extends Document {
  creationDate: Date;
  deletionDate: Date | null;
  lastUpdated: Date;
  email: string;
  name?: string;
  devicesLinked: mongoose.Types.ObjectId[] | DeviceInterface[]; // Adjust type to handle populated documents
}

const UserSchema: Schema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  deletionDate: {
    type: Date,
    default: null,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  devicesLinked: [{
    type: Schema.Types.ObjectId,
    ref: 'Device',
  }],
});

const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
