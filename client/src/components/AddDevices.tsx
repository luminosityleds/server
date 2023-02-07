import React, { FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { Users } from "../Interfaces"
import axios from 'axios';

const AddDeviceButton: FC = () => {
  const [showUUIDPrompt, setShowUUIDPrompt] = useState(false);
  const [uuid, setUuid] = useState('');
  const [searchResults, setSearchResults] = useState(Object);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUuid(event.target.value);
  }

  const addDeviceButtonClick = () => {
    {showUUIDPrompt 
    ? setShowUUIDPrompt(false)
    : setShowUUIDPrompt(true);
    }
  }

  const addDeviceClick = () => {
    //axios.get('http://localhost:4000/app/account');
    let email = "jchhan17@gmail.com"; //hardcoded email for showing it works
    //finds the device
    axios.get(`http://localhost:4000/app/devices/search/${uuid}`).then(response => {
            setSearchResults(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
                           
    //updates the devices of the account with that email
    axios.patch(`http://localhost:4000/app/accounts/${email}/add-device`, { deviceId: searchResults._id })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
  }

  return (
    <div>
      <div>
      
        <button className="addDevice-button" onClick={ addDeviceButtonClick }>Add Device</button>
        
      </div>
        
      {showUUIDPrompt && (
        <div className="uuid-prompt">
        <input type="text" placeholder="Device UUID" onChange={handleChange}/>
        <FontAwesomeIcon icon={faPlus} onClick={addDeviceClick} />
        </div>
      )}
    </div>
  );
};

export default AddDeviceButton;

