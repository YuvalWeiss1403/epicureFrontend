import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import "./SignUp.css";

const SignUp: React.FC = () => {
	const navigator = useNavigate();
	const defaultInputValue = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const [User, setUser] = useState(defaultInputValue);
	const [PasswordsMatch, setPasswordsMatch] = useState(false);

	useEffect(() => {
		handelPasswords();
	}, [User]);

	const onSignUp = async () => {
		try {
			const userReq = await axios.post("http://localhost:8000/users/", {
				first_name: User.first_name,
				last_name: User.last_name,
				email: User.email,
				password: User.password,
			});
			sessionStorage.setItem("user", JSON.stringify(userReq.data));
			navigator("/UserInfo");
		} catch (error: any) {
			alert(error.response.data);
			return [];
		}
	};

	const handelSignUp = async () => {
		PasswordsMatch ? await onSignUp() : console.log("not match");
	};

	const handelPasswords = () => {
		setPasswordsMatch(() => {
			if (User.confirmPassword != User.password) {
				console.log("false" + " " + User.confirmPassword + " " + User.password);
				return false;
			} else {
				console.log("true" + " " + User.confirmPassword + " " + User.password);
				return true;
			}
		});
	};

	return (
		<div className="signUp-page">
			<NavBar />
			<div className="signUp-content">
				<div className="signUp-page-heading">Sign up</div>
				<div className="signUp-page-secondary-heading">
					To continue the order, please sign up
				</div>
				<input
					value={User.first_name}
					onChange={(e) => setUser({ ...User, first_name: e.target.value })}
					className="enter-first-name"
					type="text"
					placeholder="First Name"></input>
				<input
					value={User.last_name}
					onChange={(e) => setUser({ ...User, last_name: e.target.value })}
					className="enter-last-name"
					type="text"
					placeholder="Last Name"></input>
				<input
					value={User.email}
					onChange={async (e) =>
						await setUser({ ...User, email: e.target.value })
					}
					className="enter-email"
					type="email"
					placeholder="Email address"></input>
				<input
					value={User.password}
					onChange={(e) => setUser({ ...User, password: e.target.value })}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
					className="enter-password"
					type="password"
					placeholder="Enter password"
					required></input>
				<div className="confirm-password-container">
					<input
						value={User.confirmPassword}
						onChange={async (e) => {
							await setUser({ ...User, confirmPassword: e.target.value });
						}}
						className="enter-password-again"
						type="password"
						placeholder="Enter password again"></input>
					<label className={PasswordsMatch ? "match" : "not-match"}>
						Passwords do not match
					</label>
				</div>
				<button
					id="page-sign-up-button"
					disabled={PasswordsMatch ? false : true}
					onClick={(e) => {
						e.preventDefault();
						handelPasswords();
						handelSignUp();
						setUser(defaultInputValue);
					}}>
					sign up
				</button>
			</div>

			<Footer />
		</div>
	);
};

export default SignUp;
