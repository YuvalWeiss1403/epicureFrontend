import React from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./PopularRestaurants.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRestaurant } from "../Restaurants/Restaurants";
import { RootState } from "../../store/Store";

const PopularRestaurants: React.FC = () => {
	const navigator = useNavigate();
	const PopularRestaurantsData = useSelector(
		(state: RootState) => state.restaurant.value
	);

	return (
		<div className="popular-rest">
			<div className="popular-rest-heading">popular restaurant in epicure:</div>
			<div className="rest-cards">
				{PopularRestaurantsData.map(
					(restaurant: IRestaurant, index: number) => {
						return (
							index < 3 &&
							restaurant.popular && (
								<RestaurantCard
									_id={restaurant._id}
									imgSource={restaurant.img}
									restName={restaurant.name}
									chef={restaurant.chef}
									stars={restaurant.rating}
									key={index}
								/>
							)
						);
					}
				)}
			</div>
			<button
				className="to-all-rest-button"
				onClick={() => navigator("/restaurants")}>
				{"All restaurants >>"}
			</button>
		</div>
	);
};

export default PopularRestaurants;
