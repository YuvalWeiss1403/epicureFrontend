import { ObjectId } from "mongoose";
import React from "react";
import ChefsNavbar from "../ChefsNavbar/ChefsNavbar";
import ChefsPageAll from "../ChefsPageAll/ChefsPageAll";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import "./Chefs.css";

export interface IChefs {
	_id: ObjectId;
	id?: number;
	name: string;
	restaurant: ObjectId[];
	age: number;
	icons: string;
	img: string;
	description: string;
	chefOfTheWeek: boolean;
	isChefNew: boolean;
	mostViewed: boolean;
}
export interface IChefsState {
	value: IChefs[];
}

const Chefs: React.FC = () => {
	return (
		<div className="chef-page">
			<NavBar />
			<ChefsNavbar />
			<ChefsPageAll />
			<Footer />
		</div>
	);
};

export default Chefs;
