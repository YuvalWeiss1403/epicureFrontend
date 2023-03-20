import React, { useEffect, useState } from "react";
import "./RestaurantsNavbar.css";
import { useDispatch } from "react-redux";
import {
	AllRestaurants,
	NewRestaurants,
	MostPopularRestaurants,
	OpenNowRestaurants,
} from "../../store/slices/RestaurantsSlice";

enum FilterType {
	All = "RestaurantsAll",
	New = "RestaurantsNew",
	MostPopular = "RestaurantsMostPopular",
	OpenNow = "RestaurantsOpenNow",
}

const filters = [
	{ label: "All", type: FilterType.All },
	{ label: "New", type: FilterType.New },
	{ label: "Most popular", type: FilterType.MostPopular },
	{ label: "Open Now", type: FilterType.OpenNow },
];

const RestaurantsNavbar: React.FC = () => {
	const dispatch = useDispatch();
	const [filteredRestaurants, setFilteredRestaurants] = useState(
		FilterType.All
	);

	useEffect(() => {
		dispatch(AllRestaurants());
	}, []);

	const handleFilterClick = (filterType: FilterType) => {
		setFilteredRestaurants(filterType);
		switch (filterType) {
			case FilterType.All:
				dispatch(AllRestaurants());
				break;
			case FilterType.New:
				dispatch(NewRestaurants());
				break;
			case FilterType.MostPopular:
				dispatch(MostPopularRestaurants());
				break;
			case FilterType.OpenNow:
				dispatch(OpenNowRestaurants());
				break;
			default:
				break;
		}
	};

	return (
		<div className="restaurants-navbar">
			{filters.map((filter, index) => (
				<button
					key={index}
					className={
						filteredRestaurants === filter.type ? "filter-on" : "filter-off"
					}
					onClick={() => handleFilterClick(filter.type)}>
					{filter.label}
				</button>
			))}
		</div>
	);
};

export default RestaurantsNavbar;
