import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import DishCard, { IDishes } from "../DishCard/DishCard";
import "./SingleRestaurantPage.css";
import Footer from "../Footer/Footer";
import SingleRestaurantPageNavBar from "../SingleRestaurantPageNavBar/SingleRestaurantPageNavBar";
import { RootState } from "../../store/Store";
import { IRestaurant } from "../Restaurants/Restaurants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RemoveRest } from "../../store/slices/RestaurantsSlice";
import AddDishModal from "../AddDishModal/AddDishModal";

const SingleRestaurantPage: React.FC = () => {
	let { restaurantId } = useParams<string>();
	const [DeleteModal, setDeleteModal] = useState(false);
	const navigator = useNavigate();
	const dispatch = useDispatch();

	const restaurantData = useSelector(
		(state: RootState) => state.restaurant.value
	);
	const dishesData = useSelector((state: RootState) => state.dish.value);
	const currentRestData: IRestaurant | undefined = restaurantData?.find(
		(rest: IRestaurant) => {
			return rest._id?.toString() === restaurantId;
		}
	);

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

	const handelDelete = () => {
		setDeleteModal(true);
	};

	const handelCancel = () => {
		setDeleteModal(false);
	};

	const handelDeleteRest = () => {
		deleteRest();
	};

	const deleteRest = async () => {
		try {
			const response = await fetch(
				"https://epicure-server-z5p7.onrender.com/restaurants",
				{
					method: "DELETE",
					body: JSON.stringify({
						_id: restaurantId,
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			dispatch(RemoveRest(data.data));
			navigator("/restaurants");
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);

	const openModal = (): void => {
		setIsOpen(true);
	};

	const closeModal = (): void => {
		setIsOpen(false);
	};

	return (
		<div className="single-rest-page">
			<NavBar />
			<div className="single-rest-container">
				{currentRestData && (
					<>
						<img
							src={currentRestData.img}
							alt="restaurant"
							className="rest-img"></img>
						<button onClick={() => handelDelete()} className="delete-rest">
							Delete
						</button>
						<button onClick={() => openModal()} className="add-dish">
							Add Dish
						</button>
						<div className="rest-name">{currentRestData.name}</div>
						<div className="chef-name">{currentRestData.chef}</div>
						<div className="is-open">
							{isRestOpen(currentRestData) ? "Open now" : "closed"}
						</div>
					</>
				)}
				<SingleRestaurantPageNavBar />
				<div className="dishes-container">
					{dishesData.map((dish: IDishes, index: number) => {
						return (
							<DishCard
								_id={dish._id}
								imgSource={dish.img}
								dishName={dish.name}
								description={dish.about}
								dishType={[]}
								Price={dish.price}
								key={index}
								className={"single-rest-page-card"}
							/>
						);
					})}
				</div>
			</div>
			{DeleteModal && (
				<div className="confirm-delete-modal">
					<div className="delete-modal-content">
						<div className="delete-modal-header">Are you sure?</div>
						<div className="confirm-buttons">
							<button
								onClick={() => handelDeleteRest()}
								className="confirm-delete">
								Confirm
							</button>
							<button onClick={() => handelCancel()} className="cancel-delete">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<AddDishModal
				closeFunction={closeModal}
				modalIsOpen={modalIsOpen}
				restId={restaurantId}></AddDishModal>
			<Footer />
		</div>
	);
};

export default SingleRestaurantPage;
