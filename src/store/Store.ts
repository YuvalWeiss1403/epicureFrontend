import { configureStore } from "@reduxjs/toolkit";
import chefReducer from "./slices/ChefsSlice";
import restaurantReducer from "./slices/RestaurantsSlice";
import dishReducer from "./slices/dishslice";
import { IRestaurantsState } from "../components/Restaurants/Restaurants";
import { IChefsState } from "../components/Chefs/Chefs";
import { IDishesState } from "../components/DishCard/DishCard";

export interface RootState {
	chef: IChefsState;
	restaurant: IRestaurantsState;
	dish: IDishesState;
}

export default configureStore({
	reducer: {
		chef: chefReducer,
		restaurant: restaurantReducer,
		dish: dishReducer,
	},
});
