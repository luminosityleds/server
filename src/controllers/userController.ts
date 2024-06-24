import { Request, Response } from 'express';
import Device, { DeviceInterface } from '../models/DeviceSchema'; // Import Device and DeviceInterface
import User, { UserInterface } from '../models/UserSchema'; // Import User and UserInterface

// Controller to handle user registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, deletionDate, devicesLinked } = req.body;
    const currentDate = new Date();

    // Create a new user instance
    const newUser: UserInterface = new User({
      email,
      name,
      creationDate: currentDate,
      lastUpdated: currentDate,
      deletionDate: deletionDate ? new Date(deletionDate) : null,
      devicesLinked: [], // Initialize as an empty array
    });

    // Check if devicesLinked is provided and not empty
    if (devicesLinked && devicesLinked.length > 0) {
      const savedDevices: DeviceInterface[] = [];

      // Iterate through devicesLinked array to create and save devices
      for (const deviceData of devicesLinked) {
        const newDeviceData: DeviceInterface = {
          ...deviceData,
          lastUpdated: currentDate,
        };

        const newDevice = new Device(newDeviceData);
        const savedDevice = await newDevice.save();
        savedDevices.push(savedDevice);
      }

      // Map the saved device IDs to newUser.devicesLinked
      newUser.devicesLinked = savedDevices.map((device: DeviceInterface) => device._id);
    }

    // Save the user with linked devices
    let savedUser: UserInterface | null = await newUser.save();

    // Populate the devicesLinked field
    savedUser = await User.findById(savedUser._id).populate('devicesLinked').exec();

    if (!savedUser) {
      throw new Error('User not found after saving');
    }

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: UserInterface[] = await User.find().populate('devicesLinked');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: UserInterface | null = await User.findById(req.params.id).populate('devicesLinked');

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user by ID
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: UserInterface | null = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
