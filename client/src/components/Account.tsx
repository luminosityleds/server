import React, { FC, ChangeEvent, useState } from "react";
import { Users } from "../Interfaces";

export const Account: FC<Users> = (props: Users) => {
  const [username, setUsername] = useState<string | null>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1> {props.username} </h1>
      <h1> {props.password} </h1>
      <h1> {props.devices} </h1>
      <input placeholder="Username" onChange={handleChange} />
      {username}
    </div>
  );
};
