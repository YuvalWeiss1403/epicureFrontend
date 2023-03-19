import React from "react";
import "./NavBarMobileMenu.css";
import { NavLink } from "react-router-dom";

const NavBarMobileMenu: React.FC = () => {
	return (
		<section className="mobile-nav">
			<input id="menu-toggle" type="checkbox" />
			<label className="menu-button-container" htmlFor="menu-toggle">
				<div className="menu-button"></div>
			</label>
			<ul className="menu">
				<li>
					<NavLink
						className={({ isActive }) => (isActive ? "on-page" : "not-on-page")}
						to={"/restaurants"}>
						Restaurants
					</NavLink>
				</li>
				<li className="chef-mobile-button">
					<NavLink
						className={({ isActive }) => (isActive ? "on-page" : "not-on-page")}
						to={"/chefs"}>
						Chefs
					</NavLink>
				</li>
				<li>
					<button className="contact-us">Contact Us</button>
				</li>
				<li>
					<button className="term-of-use">Term of Use</button>
				</li>
				<li>
					<button className="privacy-policy">Privacy Policy</button>
				</li>
			</ul>
		</section>
	);
};

export default NavBarMobileMenu;
