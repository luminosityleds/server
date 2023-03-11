import React from "react";

import "../css/App.css"


export const Team = () => 
{
  return (

  <div className="team-page-cover">
    <h1 style={{textAlign: "center",fontSize:60, padding: "20px", color: "#67ACF7"}}> Team Page </h1>
      <h2 className="member-layout">
            <h3>Aaron Levitt : Team Lead</h3>  
        </h2>
        <h2 className="member-layout">
            <h3>Matthew Levitt : Full-stack Engineer </h3>
        </h2>
        <h2 className="member-layout">
            <h3>Erika Ledesma : Full-stack Engineer </h3>
        </h2>  
    {/* <div className="team-page-cover"></div> */}
        <h2 className="member-layout">
            <h3> Jason Chhan : Full-stack Engineer </h3>
        </h2>
        <h2 className="member-layout">
            <h3> Alan Mong : Full-stack Engineer </h3>
        </h2>
        <h2 className="member-layout">
            <h3> Andrew Haigh : Cybersecurity Analyst </h3> 
        </h2>
    {/* <div className="team-page-cover"></div> */}
      <h2 className="member-layout">
            <h3> Alex Matei : Embedded Software Engineer </h3>
            
      </h2>
      <h2 className="member-layout">
          <h3> Nick Teran : Embedded Software Engineer </h3>
      </h2>
    </div>

  );
};

export default Team;


