import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OrderModal from "../OrderModal/OrderModal";

const NavBarRightSide: React.FC = () => {
	const navigator = useNavigate();
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [UserName, setUserName] = useState("");

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};
	const isUserLoggedIn = sessionStorage.getItem("user");

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem("user") || "{}");
		const userNameFromStorage = user.first_name;
		userNameFromStorage ? setUserName(userNameFromStorage) : setUserName("");
	}, []);
	return (
		<div className="navbar-right-side">
			<input className="search-input" title="Search"></input>
			<label>{`${UserName}`}</label>
			<button
				className="user"
				title="LogIn / SignIn"
				onClick={() => {
					if (isUserLoggedIn) {
						navigator("/UserInfo");
					} else {
						navigator("/logIn");
					}
				}}></button>
			<button
				className="bag"
				title="Cart"
				onClick={() => {
					modalIsOpen ? closeModal() : openModal();
				}}></button>
			<OrderModal closeFunction={closeModal} modalIsOpen={modalIsOpen} />
		</div>
	);
};

export default NavBarRightSide;
