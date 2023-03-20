import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import RestaurantsFilterBar from "../RestaurantsFilterBar/RestaurantsFilterBar";
import RestaurantsNavbar from "../RestaurantsNavbar/RestaurantsNavbar";
import RestaurantsPageAll from "../RestaurantsPageAll/RestaurantsPageAll";
import { ObjectId } from "mongoose";
import "./Restaurants.css";

export interface IRestaurant {
	_id: ObjectId;
	name: string;
	address: string[];
	chef: string;
	chefId: ObjectId;
	openHours: number[];
	openDays: number[];
	openYear: number;
	img: string;
	dishes: ObjectId[];
	rating: number;
	popular: boolean;
	newRest: boolean;
	openNow: boolean;
}
export interface IRestaurantsState {
	value: IRestaurant[];
}

const Restaurants: React.FC = () => {
	return (
		<div className="restaurants-page">
			<NavBar />
			<RestaurantsNavbar />
			<RestaurantsFilterBar />
			<RestaurantsPageAll />
			<Footer />
		</div>
	);
};

export default Restaurants;
