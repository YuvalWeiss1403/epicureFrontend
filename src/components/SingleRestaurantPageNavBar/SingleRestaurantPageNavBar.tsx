import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
	AllDishesInSingleRestaurant,
	BreakfastDishesInSingleRestaurant,
	LunchDishesInSingleRestaurant,
	DinnerDishesInSingleRestaurant,
} from "../../store/slices/dishslice";
import { RootState } from "../../store/Store";
import "./SingleRestaurantPageNavBar.css";
import { ObjectId } from "mongoose";
import { IRestaurant } from "../Restaurants/Restaurants";

const allDishes = "AllDishes";
const breakfastDishes = "breakfastDishes";
const lunchDishes = "lunchDishes";
const dinnerDishes = "dinnerDishes";

const SingleRestaurantPageNavBar: React.FC = () => {
	const restaurantData = useSelector(
		(state: RootState) => state.restaurant.value
	);

	useEffect(() => {
		dispatch(AllDishesInSingleRestaurant(currentRestData?.chefId));
	}, []);

	const [filteredDishes, setFilteredDishes] = useState(allDishes);
	const dispatch = useDispatch();
	let { restaurantId } = useParams();

	const currentRestData: IRestaurant | undefined = restaurantData?.find(
		(rest: IRestaurant) => {
			return rest._id?.toString() === restaurantId;
		}
	);

	return (
		<div className="restaurants-navbar">
			<button
				className={
					filteredDishes === breakfastDishes ? "filter-on" : "filter-off"
				}
				onClick={() => {
					setFilteredDishes(breakfastDishes);
					dispatch(BreakfastDishesInSingleRestaurant(currentRestData?.chefId));
				}}>
				Breakfast
			</button>
			<button
				className={filteredDishes === lunchDishes ? "filter-on" : "filter-off"}
				onClick={() => {
					setFilteredDishes(lunchDishes);
					dispatch(LunchDishesInSingleRestaurant(currentRestData?.chefId));
				}}>
				Lunch
			</button>
			<button
				className={filteredDishes === dinnerDishes ? "filter-on" : "filter-off"}
				onClick={() => {
					setFilteredDishes(dinnerDishes);
					dispatch(DinnerDishesInSingleRestaurant(currentRestData?.chefId));
				}}>
				Dinner
			</button>
		</div>
	);
};

export default SingleRestaurantPageNavBar;
