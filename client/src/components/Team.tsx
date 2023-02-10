import React from "react";
import {Link} from "react-router-dom"
import "../css/App.css"
const teamStyle = {
  
  padding: "10px 50px 20px",
  // position: 'fixed'
  // fontFamily: "Arial"
};

export const Team = () => 
{
  return (

    
    <div className="member-layout">
      <h1 style={{textAlign: "center",fontSize:60, padding: "20px"}}> Team Page </h1>
        <h2 style={teamStyle}>Member 2</h2>
        <h2 style={teamStyle}>Member 2</h2>
        <h2 style={teamStyle}>Member 3</h2>
        <h2 style={teamStyle}>Member 3</h2>
        <h2 style={teamStyle}>Member 1</h2>
        <h2 style={teamStyle}>Member 2</h2>
        <h2 style={teamStyle}>Member 3</h2>
        <h2 style={teamStyle}>Member 3</h2>
    </div>




  );
};




export default Team;


