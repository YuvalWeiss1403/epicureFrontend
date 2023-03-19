import { createSlice } from "@reduxjs/toolkit";
import { IDishes } from "../../components/DishCard/DishCard";
import { IRestaurant } from "../../components/Restaurants/Restaurants";

const restData = async () => {
	try {
		const response = await fetch(
			"https://epicure-server-z5p7.onrender.com/restaurants",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		return data.data;
	} catch (err) {
		console.log();
	}
};

const dishesData = async () => {
	try {
		const response = await fetch(
			"https://epicure-server-z5p7.onrender.com/dishes",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		return data.data;
	} catch (err) {
		console.log();
	}
};

const restaurants: IRestaurant[] = await restData();
const dishes: IDishes[] = await dishesData();

export const DishSlice = createSlice({
	name: "dishes",
	initialState: {
		value: dishes,
		initialValue: dishes,
	},
	reducers: {
		AllDishes: (state) => {
			state.value = state.initialValue;
		},
		RemoveDish: (state, action) => {
			state.initialValue = action.payload;
		},
		AddDish: (state, action) => {
			state.initialValue = action.payload;
		},
		AllDishesInSingleRestaurant: (state, action) => {
			const chefRest: IRestaurant[] = restaurants.filter(
				(rest: IRestaurant) =>
					rest.chefId.toString() === action.payload.toString()
			);
			state.value = state.initialValue.filter((dish: IDishes) =>
				chefRest[0].dishes.includes(dish._id)
			);
		},
		BreakfastDishesInSingleRestaurant: (state, action) => {
			const chefRest: IRestaurant[] = restaurants.filter(
				(rest: IRestaurant) => rest.chefId === action.payload
			);
			state.value = state.initialValue.filter(
				(dish: IDishes) =>
					chefRest[0]?.dishes.includes(dish._id) &&
					dish?.time.includes("Breakfast")
			);
		},
		LunchDishesInSingleRestaurant: (state, action) => {
			const chefRest: IRestaurant[] = restaurants.filter(
				(rest: IRestaurant) => rest.chefId === action.payload
			);
			state.value = state.initialValue.filter(
				(dish: IDishes) =>
					chefRest[0]?.dishes.includes(dish._id) && dish?.time.includes("lunch")
			);
		},
		DinnerDishesInSingleRestaurant: (state, action) => {
			const chefRest: IRestaurant[] = restaurants.filter(
				(rest: IRestaurant) => rest.chefId === action.payload
			);
			state.value = state.initialValue.filter(
				(dish: IDishes) =>
					chefRest[0]?.dishes.includes(dish._id) &&
					dish?.time.includes("dinner")
			);
		},
	},
});

export const {
	AllDishesInSingleRestaurant,
	AllDishes,
	RemoveDish,
	AddDish,
	BreakfastDishesInSingleRestaurant,
	LunchDishesInSingleRestaurant,
	DinnerDishesInSingleRestaurant,
} = DishSlice.actions;

export default DishSlice.reducer;
