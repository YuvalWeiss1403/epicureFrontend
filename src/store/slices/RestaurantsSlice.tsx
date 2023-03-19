import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";
import { IDishes } from "../../components/DishCard/DishCard";
import { IRestaurant } from "../../components/Restaurants/Restaurants";

const restData = async () => {
	try {
		const response = await fetch("http://localhost:8000/restaurants", {
			method: "GET",
		});
		const data = await response.json();
		return data.data;
	} catch (err) {
		console.log();
	}
};

const dishesData = async () => {
	try {
		const response = await fetch("http://localhost:8000/dishes", {
			method: "GET",
		});
		const data = await response.json();
		return data.data;
	} catch (err) {
		console.log();
	}
};

const restaurants: IRestaurant[] = await restData();
const dishes: IDishes[] = await dishesData();

export const RestaurantSlice = createSlice({
	name: "restaurants",
	initialState: {
		value: restaurants,
		dishes: dishes,
		initialValue: restaurants,
	},
	reducers: {
		AllRestaurants: (state) => {
			state.value = state.initialValue;
		},
		NewRestaurants: (state) => {
			state.value = state.initialValue.filter((rest) => rest.newRest);
		},
		MostPopularRestaurants: (state) => {
			state.value = state.initialValue.filter((rest) => rest.popular);
		},
		AddRest: (state, action) => {
			state.initialValue = action.payload;
		},
		UpdateRest: (state, action) => {
			state.initialValue = action.payload;
		},
		RestaurantsOfSingleChef: (state, action) => {
			state.value = state.initialValue.filter(
				(rest) => rest.chefId.toString() === action.payload.toString()
			);
		},
		RemoveRest: (state, action) => {
			state.initialValue = action.payload;
		},
		OpenNowRestaurants: (state) => {
			const isRestOpen = (rest: IRestaurant): boolean => {
				const currentHour = new Date().getHours();
				const currentDay = new Date().getDay();
				if (rest.openDays.includes(currentDay)) {
					if (rest.openHours[0] <= currentHour) {
						if (rest.openHours[1] >= currentHour) {
							return true;
						}
					}
				}
				return false;
			};

			state.value = state.initialValue.filter((rest) => isRestOpen(rest));
		},
		RestaurantsByRange: (state, action) => {
			const getMinMaxPrice = (dishesFromRest: ObjectId[]): number[] => {
				let max: number = 0,
					min: number = 10000;
				state.dishes.map((dish: IDishes) => {
					if (dishesFromRest.includes(dish._id)) {
						if (max < dish.price) {
							max = dish.price;
						}
						if (min > dish.price) {
							min = dish.price;
						}
					}
				});
				return [min, max];
			};
			const isRestInRange = (rest: IRestaurant, range: number[]) => {
				const minMaxPrice: number[] = getMinMaxPrice(rest.dishes);
				if (minMaxPrice[0] <= range[0] && minMaxPrice[1] >= range[1]) {
					return true;
				} else {
					return false;
				}
			};
			state.value = state.value.filter((rest) => {
				isRestInRange(rest, action.payload);
			});
		},
		RestaurantsByRating: (state, action) => {
			state.value = state.initialValue.filter((rest) =>
				action.payload.includes(rest.rating)
			);
		},
	},
});

export const {
	AllRestaurants,
	NewRestaurants,
	UpdateRest,
	AddRest,
	MostPopularRestaurants,
	RestaurantsOfSingleChef,
	RemoveRest,
	OpenNowRestaurants,
	RestaurantsByRange,
	RestaurantsByRating,
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
