import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import "./LogInPage.css";

const LogInPage: React.FC = () => {
	const navigator = useNavigate();
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");

	const onLogin = async () => {
		try {
			const userReq = await axios.post("http://localhost:8000/users/login", {
				email: Email,
				password: Password,
			});
			sessionStorage.setItem("user", JSON.stringify(userReq.data));
			navigator("/");
		} catch (error: any) {
			alert(error.response.data);
			return [];
		}
	};

	const handelLogin = async () => {
		await onLogin();
	};

	return (
		<div className="logIn-page">
			<NavBar />
			<div className="login-content">
				<div className="signIn-page-heading">Sign in</div>
				<div className="signIn-page-secondary-heading">
					To continue the order, please sign in
				</div>
				<input
					value={Email}
					className="enter-email"
					type="email"
					placeholder="Email address"
					onChange={(e) => setEmail(e.target.value)}></input>
				<input
					value={Password}
					className="enter-password"
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}></input>
				<button
					id="page-login"
					onClick={() => {
						handelLogin();
						setEmail("");
						setPassword("");
					}}>
					Login
				</button>
				<button id="page-forget-password">Forget password?</button>
				<div className="or-div">
					<hr></hr>
					<div>or</div>
					<hr></hr>
				</div>
				<button id="page-sign-up-button" onClick={() => navigator("/signUp")}>
					sign up
				</button>
			</div>

			<Footer />
		</div>
	);
};

export default LogInPage;
