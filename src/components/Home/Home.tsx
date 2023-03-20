import React, { useEffect } from "react";
import SignatureDishOf from "../SignatureDishOf/SignatureDishOf";
import AboutUs from "../AboutUs/AboutUs";
import ChefOfTheWeek from "../ChefOfTheWeek/ChefOfTheWeek";
import Footer from "../Footer/Footer";
import IconsMeaning from "../IconsMeaning/IconsMeaning";
import NavBar from "../NavBar/NavBar";
import PopularRestaurants from "../PopularRestaurants/PopularRestaurants";
import SearchContainer from "../SearchContainer/SearchContainer";
import { useDispatch } from "react-redux";
import { AllChefs } from "../../store/slices/ChefsSlice";
import { AllRestaurants } from "../../store/slices/RestaurantsSlice";
import { AllDishes } from "../../store/slices/dishslice";
import "./Home.css";

const Home: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(AllChefs());
		dispatch(AllRestaurants());
		dispatch(AllDishes());
	}, []);

	return (
		<div className="home-page">
			<NavBar />
			<SearchContainer />
			<PopularRestaurants />
			<SignatureDishOf />
			<IconsMeaning />
			<ChefOfTheWeek />
			<AboutUs />
			<Footer />
		</div>
	);
};

export default Home;
