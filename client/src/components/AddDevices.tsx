import React, { FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faXmark, faCheck} from "@fortawesome/free-solid-svg-icons";
import { Users } from "../Interfaces"
import axios from 'axios';

const AddDeviceButton: FC = () => {
  const [showUUIDPrompt, setShowUUIDPrompt] = useState(false);
  const [uuid, setUuid] = useState('');
  const [buttonStatus, setButtonStatus] = useState(faPlus);
  const [buttonClass, setButtonClass] = useState("faPlus");
  const [phTxt, setPHTxt] = useState("Device UUID");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUuid(event.target.value);
    console.log(event.target.value);
  }

  const addDeviceButtonClick = () => {
    {showUUIDPrompt 
    ? setShowUUIDPrompt(false)
    : setShowUUIDPrompt(true);
    }
  }

  const success = () =>{
    setUuid('');
    setPHTxt("Added!");
    setButtonStatus(faCheck);
    setButtonClass("faCheck");
    setTimeout(() => {
      setButtonStatus(faPlus);
      setButtonClass("faPlus");
      setPHTxt("Device UUID");
    }, 2000);
  }
  const fail = () =>{
    setUuid('');
    setPHTxt("ID Not Found!");
    setButtonStatus(faXmark);
    setButtonClass("faXmark");
    setTimeout(() => {
      setButtonStatus(faPlus);
      setButtonClass("faPlus");
      setPHTxt("Device UUID");
    }, 2000);
  }

  const addDeviceClick = () => {
    //axios.get('http://localhost:4000/app/account'); will return an account's data on email inputted
    let email = "jchhan17@gmail.com"; //hardcoded email for showing it works
    //finds the device
    axios.get(`http://localhost:4000/app/devices/search/${uuid}`)
          .then(response => {
            console.log(response.data);
            console.log(response.data._id);
            //if uuid is not in DB, _id is undefined and nothing gets patched into the account
            if (response.data._id == undefined){
              fail();
            }else{
              // updates the devices of the account with that email
              axios.patch(`http://localhost:4000/app/accounts/${email}/add-device`, { deviceId: response.data._id })
                .then(response => {
                  console.log(response.data)
                })
                .catch(error => {
                  console.log(error);
                });
              success();
            }
          })
          .catch(error => {
            console.log(error);
            fail();
          });
    
    
  }

  return (
    <div>
      <div>
      
        <button className="addDevice-button" onClick={ addDeviceButtonClick }>Add Device</button>
        
      </div>
        
      {showUUIDPrompt && (
        <div className="uuid-prompt">
        <input type="text" value={uuid} placeholder={phTxt} onChange={handleChange}/>
        <FontAwesomeIcon className={buttonClass} icon={buttonStatus} onClick={addDeviceClick} />
        </div>
      )}
    </div>
  );
};

export default AddDeviceButton;

