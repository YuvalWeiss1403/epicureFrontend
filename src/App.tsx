import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Restaurants from "./components/Restaurants/Restaurants";
import Chefs from "./components/Chefs/Chefs";
import SingleRestaurantPage from "./components/SingleRestaurantPage/SingleRestaurantPage";
import SignUp from "./components/SignUp/SignUp";
import LogInPage from "./components/LogInPage/LogInPage";
import SingleChefPage from "./components/SingleChefPage/SingleChefPage";
import SignedInUser from "./components/SignedInUser/SignedInUser";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/restaurants" element={<Restaurants />} />
				<Route
					path="/restaurants/:restaurantId"
					element={<SingleRestaurantPage />}
				/>
				<Route path="/chefs" element={<Chefs />} />
				<Route path="/chefs/:chefsId" element={<SingleChefPage />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/logIn" element={<LogInPage />} />
				<Route path="/UserInfo" element={<SignedInUser />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
