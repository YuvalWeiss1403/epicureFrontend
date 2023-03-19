import React from "react";
import logo from "../../assets/about-logo.svg";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
	const contentPart1: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel justo fermentum bibendum non 
    eu ipsum. Cras porta malesuada eros, eget blandit
     turpis suscipit at.  Vestibulum sed massa in magna sodales porta.  Vivamus elit urna, 
    dignissim a vestibulum.`;

	const contentPart2: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel justo fermentum bibendum no
    eu ipsum. Cras porta malesuada eros.`;

	return (
		<div className="About-us">
			<div className="about-us-content-download">
				<div className="about-us-content">
					<div className="about-us-Heading">ABOUT US:</div>
					<div className="content">{contentPart1}</div>
					<div className="content">{contentPart2}</div>
				</div>
				<div className="download">
					<button className="download-apple">
						Download on the <span>App Store</span>
					</button>
					<button className="download-android">
						Get it on <span>Google Play</span>
					</button>
				</div>
			</div>
			<div className="logo-img">
				<img className="about-logo" alt="logo" src={logo}></img>
			</div>
		</div>
	);
};

export default AboutUs;
