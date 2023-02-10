import React from "react";
import {Link} from "react-router-dom"
import "../css/App.css"

const teamStyle = {
  
  padding: "10px 50px 20px",
};

export const Team = () => 
{
  return (

    
  <div className="team-page-cover">
    <h1 style={{textAlign: "center",fontSize:60, padding: "20px", color: "#5FCFF4"}}> Team Page </h1>
      {/* Start of third party login buttons */}
      <h2 className="member-layout">
        Aaron Levitt : Team Lead 
        </h2>
        <h2 className="member-layout">
        Matthew Levitt : Full-stack Engineer 
        </h2>
        <h2 className="member-layout">
        Erika Ledesma : Full-stack Engineer 
        </h2>  
    <div className="team-page-cover"></div>
        <h2 className="member-layout">
        Jason Chhan : Full-stack Engineer 
        </h2>
        <h2 className="member-layout">
        Alan Mong : Full-stack Engineer 
        </h2>
        <h2 className="member-layout">
        Andrew Haigh : Cybersecurity Analyst 
        </h2>
    <div className="team-page-cover"></div>
      <h2 className="member-layout">
      Alex Matei : Embedded Software Engineer 
      </h2>
      <h2 className="member-layout">
      Nick Teran : Embedded Software Engineer 
      </h2>


    </div>




  );
};




export default Team;


