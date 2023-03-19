import React from 'react';
import "./Footer.css"


const Footer:React.FC=()=>{
    return ( 
    <div className='footer'>
            <button className='contact-us'>Contact Us</button>
            <button className='terms-of-use'>Term of Use</button>
            <button className='privacy-policy'>Privacy Policy</button>
    </div>
    )
}

export default Footer;