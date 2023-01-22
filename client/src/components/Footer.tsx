import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faAtlassian,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <div className="main-footer">
      <div>
        {/* Column1 */}
        <div>
          <h4>luminosityleds</h4>
          <p className="about">About</p>
          <p className="team">Team</p>
          <p className="whats-new">
            <a href="https://github.com/pogi7/luminosityleds/releases/latest">
              What's New?
            </a>
          </p>
        </div>
        {/* Column2 */}
        <div>
          <h4>Contact</h4>
          <p>
            <a href="https://github.com/pogi7/luminosityleds">
              <FontAwesomeIcon icon={faGithub} />{" "}
            </a>
            | <FontAwesomeIcon icon={faAtlassian} />
            <a href="https://discord.gg/t4CBBfMj">
              | <FontAwesomeIcon icon={faDiscord} />{" "}
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} | All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
