export interface UserSchema {
  creationDate: {
    value: number;
  };

  deletionDate?: {
    value: Number;
  };

  lastUpdated?: {
    value: Number;
  };

  email: {
    value: String;
  };

  name: {
    value: String;
  };

  devicesLinked?: {
    value: {};
  };
}
