import React, { FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import { Users } from "../Interfaces"
import axios from 'axios';

const DeleteAccountButton: FC = () => {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [input, setInput] = useState('');
  const [phTxt, setPHTxt] = useState("Enter Email");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  const deleteAccountButtonClick = () => {
    {showDeletePrompt 
    ? setShowDeletePrompt(false)
    : setShowDeletePrompt(true);
    }
  }

  const closeDelAccPrompt = () => {
    setShowDeletePrompt(false);
  }

  const fail = () =>{ 
    setInput('');
    setPHTxt("Incorrect Eamil!");
    setTimeout(() => {
      setPHTxt("Enter Email");
    }, 2000);
  }



  const deleteAccountConfirmButton = () => {
    
  }
  const addDeviceClick = () => {
    //axios.get('http://localhost:4000/app/account'); will return an account's data on email inputted
    let email = "jchhan17@gmail.com"; //hardcoded email for showing it works
    //finds the device
    axios.get(`http://localhost:4000/app/devices/search/${input}`)
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
      
        <button className="deleteAccount-button" onClick={ deleteAccountButtonClick }>Delete Account</button>
        
      </div>
        
      {showDeletePrompt && (
        <div className="deleteAccount-prompt">
          <FontAwesomeIcon icon={faXmark} className="delAcc-faXmark fa-lg" onClick={closeDelAccPrompt}/>
          <div className="deleteAccount-prompt-text">
            <h2>Delete Account</h2>
            <p> Are you sure you want to delete your account? This action is irreversible!</p>
            <p> Please enter your email to confirm the deletion.</p>
          </div>

          <div className="deleteAccount-prompt-input-box">
          <input type="text" value={input} placeholder={phTxt} onChange={handleChange}/>
          <button className="deleteAccount-button deleteAccount-confirmButton" onClick={ deleteAccountConfirmButton }>Delete Account<FontAwesomeIcon icon={faTrash}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountButton;

