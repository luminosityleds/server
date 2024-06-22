import { Request, Response } from 'express';
import Device, { DeviceInterface } from '../models/DeviceSchema'; // Import Device and DeviceInterface
import User, { UserInterface } from '../models/UserSchema'; // Import User and UserInterface

// Controller to handle user registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, deletionDate, devicesLinked } = req.body;
    const currentDate = new Date();

    const newUser: UserInterface = new User({
      email,
      name,
      creationDate: currentDate,
      lastUpdated: currentDate,
      deletionDate: deletionDate ? new Date(deletionDate) : null,
      devicesLinked: [], // Initialize as an empty array
    });

    if (devicesLinked && devicesLinked.length > 0) {
      // Assuming devicesLinked is an array of objects that match DeviceInterface
      const devices: any[] = await Device.insertMany(devicesLinked); // Cast to any[] temporarily
      newUser.devicesLinked = devices.map((device: any) => device._id); // Map to _id
    }

    const savedUser: UserInterface = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: UserInterface[] = await User.find().populate('devicesLinked');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
