import React from "react";
import IRestaurantCard from "../Interfaces/IRestaurantCard";
import "./RestaurantCard.css";
import star1 from "../../assets/Stars/star1.svg";
import star2 from "../../assets/Stars/star2.svg";
import star3 from "../../assets/Stars/star3.svg";
import star4 from "../../assets/Stars/star4.svg";
import star5 from "../../assets/Stars/star5.svg";
import { useNavigate } from "react-router";
import { ObjectId } from "mongoose";

const RestaurantCard: React.FC<IRestaurantCard> = (props: IRestaurantCard) => {
	const starsEnum: { [key: number]: string } = {
		1: star1,
		2: star2,
		3: star3,
		4: star4,
		5: star5,
	};

	const dish: string = props.imgSource;
	const _id: ObjectId = props._id;
	const restName: string = props.restName;
	const chefName: string = props.chef;
	const stars: number = props.stars;

	const starsImg: string = starsEnum[Number(stars)];
	const navigator = useNavigate();

	return (
		<div
			className="rest-card-element"
			onClick={() => {
				navigator(`/restaurants/${_id}`);
			}}>
			<img className="dish-img" alt="dish" src={dish}></img>
			<div className="rest-name">{restName}</div>
			<div className="rest-chef-name">{chefName}</div>
			{stars !== 0 && <img className="stars" alt="stars" src={starsImg}></img>}
		</div>
	);
};

export default RestaurantCard;
