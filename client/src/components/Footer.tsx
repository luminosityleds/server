import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faAtlassian, faDiscord } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
    return(
        <div className="main-footer">
            <div>
                {/* Column1 */}
                <div>
                    <h4>luminosityleds</h4>
                    <p>
                        About | Team | <a href='https://github.com/pogi7/luminosityleds/releases/latest'>What's New?</a>
                    </p>
                </div>
                {/* Column2 */}
                <div>
                    <h4>Contact</h4>
                    <p>
                        <FontAwesomeIcon icon={faGithub} /> | <FontAwesomeIcon icon={faAtlassian} /> | <FontAwesomeIcon icon={faDiscord} /> | &copy; {new Date().getFullYear()} | All rights reserved 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;