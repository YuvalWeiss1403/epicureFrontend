import React from "react";
import NavBarLeftSide from "./NavBarLeftSide";
import NavBarRightSide from "./NavBarRightSide";
import "./Navbar.css";
import NavBarMobileMenu from "./NavBarMobileMenu/NavbarMobileMenu";
import mobileLogo from "../../assets/mobileNavBarLogo.svg";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
	const navigator = useNavigate();
	return (
		<nav className="navbar">
			<NavBarLeftSide />
			<NavBarMobileMenu />
			<img
				alt="mobile logo"
				className="mobile-logo"
				src={mobileLogo}
				onClick={() => {
					navigator("/");
				}}
			/>
			<NavBarRightSide />
		</nav>
	);
};

export default NavBar;
