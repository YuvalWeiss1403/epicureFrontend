import { createSlice } from "@reduxjs/toolkit";
import { IChefs } from "../../components/Chefs/Chefs";

const chefData = async () => {
	try {
		const response = await fetch("http://localhost:8000/chefs", {
			method: "GET",
		});
		const allData = await response.json();
		const data = allData.data;
		return data;
	} catch (err) {
		console.log();
	}
};
const chefs: IChefs[] = await chefData();

export const ChefsSlice = createSlice({
	name: "chefs",
	initialState: {
		value: chefs,
		initialValue: chefs,
	},
	reducers: {
		AllChefs: (state) => {
			state.value = state.initialValue;
		},
		NewChefs: (state) => {
			state.value = state.initialValue.filter((chef) => chef.isChefNew);
		},
		AddChef: (state, action) => {
			state.initialValue = action.payload;
		},
		MostViewedChefs: (state) => {
			state.value = state.initialValue.filter((chef) => chef.mostViewed);
		},
		RemoveChef: (state, action) => {
			state.initialValue = action.payload;
		},
	},
});

export const { AllChefs, AddChef, NewChefs, MostViewedChefs, RemoveChef } =
	ChefsSlice.actions;
export default ChefsSlice.reducer;
