import React from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./ChefOfTheWeek.css";
import ChefCard from "../ChefCard/ChefCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { IChefs } from "../Chefs/Chefs";
import { IRestaurant } from "../Restaurants/Restaurants";
import { ObjectId } from "mongoose";
const ChefOfTheWeek: React.FC = () => {
	const chefsData = useSelector((state: RootState) => state.chef.value);
	const restaurantsData = useSelector(
		(state: RootState) => state.restaurant.value
	);

	const currentData = chefsData.filter((chef: IChefs) => chef.chefOfTheWeek);
	const currentChef: IChefs = currentData[0];
	const chefOfWeekRestaurantsIds: ObjectId[] = currentChef?.restaurant;

	const chefOfWeekRestaurants: IRestaurant[] = restaurantsData.filter(
		(rest: IRestaurant) => {
			return chefOfWeekRestaurantsIds?.some(
				(chefRest: ObjectId) => chefRest.toString() === rest._id.toString()
			);
		}
	);

	return (
		<div className="chef-of-week">
			<div className="chef-of-week-heading">Chef of the week:</div>
			{currentData && (
				<div>
					<div className="chef-of-week-photo-description">
						<ChefCard
							chefName={currentChef.name}
							chefImg={currentChef.img}
							_id={currentChef._id}
						/>
						<div className="chef-of-week-desc">{currentChef.description}</div>
					</div>
					<button className="chef-of-week-rest-button">{`${currentChef.name}'s Restaurants`}</button>
					<div className="rest-cards-container">
						{chefOfWeekRestaurants?.map(
							(restaurant: IRestaurant, index: number) => {
								return (
									<RestaurantCard
										_id={restaurant._id}
										imgSource={restaurant.img}
										restName={restaurant.name}
										chef={restaurant.chef}
										stars={restaurant.rating}
										key={index}
									/>
								);
							}
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ChefOfTheWeek;
