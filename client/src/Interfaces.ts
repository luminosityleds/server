import { Devices } from './Enums';

export interface Users {
    // ? Optional field
    username: string;
    password: string;
    devices?: Devices;
}