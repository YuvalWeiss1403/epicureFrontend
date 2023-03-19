import React, { useState } from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./RestaurantsPageAll.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { IRestaurant } from "../Restaurants/Restaurants";
import AddRestModal from "../AddRestModal/AddRestModal";

const RestaurantsPageAll: React.FC = () => {
	const restaurantsData = useSelector(
		(state: RootState) => state.restaurant.value
	);
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);

	const openModal = (): void => {
		setIsOpen(true);
	};

	const closeModal = (): void => {
		setIsOpen(false);
	};

	return (
		<div className="restaurants-container">
			<button onClick={() => openModal()} className="add-rest">
				Add Restaurant
			</button>
			{restaurantsData.map((restaurant: IRestaurant, index: number) => {
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
			})}
			<AddRestModal
				closeFunction={closeModal}
				modalIsOpen={modalIsOpen}></AddRestModal>
		</div>
	);
};

export default RestaurantsPageAll;
