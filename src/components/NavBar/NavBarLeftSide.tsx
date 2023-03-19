import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBarLeftSide: React.FC = () => {
	const navigator = useNavigate();
	return (
		<div className="navbar-left-side">
			<button
				className="logo"
				title="Home Page"
				onClick={() => {
					navigator("/");
				}}></button>
			<NavLink
				className={({ isActive }) => (isActive ? "on-page" : "not-on-page")}
				to={"/restaurants"}>
				Restaurants
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? "on-page" : "not-on-page")}
				to={"/chefs"}>
				Chefs
			</NavLink>
		</div>
	);
};

export default NavBarLeftSide;
