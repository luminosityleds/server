import React, { FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
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
    setPHTxt("Incorrect Email!");
    setTimeout(() => {
      setPHTxt("Enter Email");
    }, 2000);
  }



  const deleteAccountConfirmButton = () => {
    let loggedInEmail = "";

    if (input == loggedInEmail) {
      console.log(`${input}`);
      //Send axios request
      axios.get(`http://localhost:4000/app/account`, 
      {
        headers: {
          "email": `${input}`
        }
      })
        .then(response => {
          console.log(response.data);
          console.log(response.data.result.email);
          //if email is not in DB, _id is undefined and nothing gets patched into the account
          if (response.data.success == false){
            fail();
          }else{
            // copy & save to deletedAccounts Collection
            axios.post(`http://localhost:4000/app/transferDeletedAccount/`, { 
              _id: response.data.result._id,
              creationDate: response.data.result.creationDate,
              email: response.data.result.email,
              name: response.data.result.name,
              devicesLinked: response.data.result.devicesLinked
              })
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.log(error);
              });
            //delete account from the accounts collection
            axios.delete(`http://localhost:4000/app/deleteAccount/${response.data.result.email}`);
          }
        })
        .catch(error => {
          console.log(error);
          fail();
        });
      //Log out somewhere at the end of this successful process
    
    }
    else{fail();}
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

