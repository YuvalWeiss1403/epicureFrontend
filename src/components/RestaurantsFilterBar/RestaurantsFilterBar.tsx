import React, { useState } from "react";
import "./RestaurantsFilterBar.css";
import star1 from "../../assets/Stars/star1.svg";
import star2 from "../../assets/Stars/star2.svg";
import star3 from "../../assets/Stars/star3.svg";
import star4 from "../../assets/Stars/star4.svg";
import star5 from "../../assets/Stars/star5.svg";
import ReactSlider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import {
	AllRestaurants,
	RestaurantsByRating,
} from "../../store/slices/RestaurantsSlice";
import { RootState } from "../../store/Store";

const RestaurantsFilterBar: React.FC = () => {
	const dispatch = useDispatch();
	const [PriceRange, setPriceRange] = useState<boolean>(false);
	const [Distance, setDistance] = useState<boolean>(false);
	const [Rating, setRating] = useState<boolean>(false);
	const [CurrentFilter, setCurrentFilter] = useState<string>("");
	const allDishes = useSelector((state: RootState) => state.dish.value);
	const minDish = (): number => {
		let minPrice = 1000;
		allDishes.map((dish) => {
			if (dish.price < minPrice) {
				minPrice = dish.price;
			}
		});
		return minPrice;
	};
	const maxDish = (): number => {
		let maxPrice = 0;
		allDishes.map((dish) => {
			if (dish.price > maxPrice) {
				maxPrice = dish.price;
			}
		});
		return maxPrice;
	};

	const [MinPrice, setMinPrice] = useState<number>(minDish());
	const [MaxPrice, setMaxPrice] = useState<number>(maxDish());

	const closeModal = (buttonLabel: string) => {
		setCurrentFilter("");
		switch (buttonLabel) {
			case "Price Range":
				setPriceRange(false);
				break;
			case "Distance":
				setDistance(false);
				break;
			case "Rating":
				setRating(false);
				break;
		}
	};

	const filters = [
		{ label: "Price Range", className: "price-range", state: PriceRange },
		{ label: "Distance", className: "distance", state: Distance },
		{ label: "Rating", className: "rating", state: Rating },
	];

	const rating = [
		{ stars: 1, source: star1 },
		{ stars: 2, source: star2 },
		{ stars: 3, source: star3 },
		{ stars: 4, source: star4 },
		{ stars: 5, source: star5 },
	];

	let ratingArr: number[] = [0, 0, 0, 0, 0];
	const handleChange = (rating: number) => {
		if (ratingArr[rating - 1] === rating) {
			ratingArr[rating - 1] = 0;
		} else {
			ratingArr[rating - 1] = rating;
		}
		if (String(ratingArr) === "0,0,0,0,0") {
			dispatch(AllRestaurants());
		} else {
			dispatch(RestaurantsByRating(ratingArr));
		}
	};

	const handleModalOpen = (label: string): void => {
		switch (label) {
			case "Price Range":
				setPriceRange(true);
				setCurrentFilter("Price Range");
				setDistance(false);
				setRating(false);
				break;
			case "Distance":
				setPriceRange(false);
				setDistance(true);
				setCurrentFilter("Distance");
				setRating(false);
				break;
			case "Rating":
				setPriceRange(false);
				setDistance(false);
				setRating(true);
				setCurrentFilter("Rating");
				break;
		}
	};
	return (
		<div className="restaurants-filter-bar">
			{filters.map((filter, index: number) => {
				return (
					<button
						className="filter"
						key={index}
						id={CurrentFilter === filter.label ? "filter-on" : "filter-off"}
						onClick={() => {
							filter.state
								? closeModal(filter.label)
								: handleModalOpen(filter.label);
						}}>
						{filter.label}
					</button>
				);
			})}
			{PriceRange && (
				<div className="price-modal">
					<div className="price-heading">Price Range Selected</div>
					<div className="price-range-heading">{`₪${MinPrice} - ₪${MaxPrice}`}</div>
					<div className="price-slider-container">
						<ReactSlider
							defaultValue={[MinPrice, MaxPrice]}
							className="price-slider"
							trackClassName="price-tracker"
							thumbClassName="price-slider-thumb"
							// renderThumb={(props, state) => (
							// 	<div
							// 		className="price-thumb-heading"
							// 		{...props}>{`₪${state.valueNow}`}</div>
							// )}
							step={1}
							min={MinPrice}
							max={MaxPrice}
							withTracks={true}
							pearling={true}
							onChange={([MinPrice, MaxPrice]) => {
								setMinPrice(MinPrice);
								setMaxPrice(MaxPrice);
							}}
						/>
					</div>
				</div>
			)}
			{Distance && (
				<div className="distance-modal">
					<div className="distance-heading">Distance</div>
					<input type="range" />
				</div>
			)}
			{Rating && (
				<div className="rating-modal">
					<div className="rating-heading">Rating</div>
					<ul>
						{rating.map((value, index: number) => (
							<li key={index}>
								<input
									type="checkbox"
									onChange={() => handleChange(index + 1)}
								/>
								<img src={value.source} alt={`${index + 1}-stars`} />
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default RestaurantsFilterBar;
