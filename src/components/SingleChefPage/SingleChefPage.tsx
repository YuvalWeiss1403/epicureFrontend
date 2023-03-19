import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import "./SingleChefPage.css";
import Footer from "../Footer/Footer";
import { RootState } from "../../store/Store";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { IRestaurant } from "../Restaurants/Restaurants";
import { IChefs } from "../Chefs/Chefs";
import { ObjectId } from "mongoose";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RemoveChef } from "../../store/slices/ChefsSlice";

const SingleChefPage: React.FC = () => {
	let { chefsId } = useParams();
	const [DeleteModal, setDeleteModal] = useState(false);
	const navigator = useNavigate();
	const dispatch = useDispatch();

	const chefsData: IChefs[] = useSelector(
		(state: RootState) => state.chef.value
	);
	const selectedChef: IChefs | undefined = chefsData?.find(
		(chef: IChefs) => chef._id.toString() === chefsId
	);

	const restaurantsData: IRestaurant[] = useSelector(
		(state: RootState) => state.restaurant.value
	);

	const handelDelete = () => {
		setDeleteModal(true);
	};

	const handelCancel = () => {
		setDeleteModal(false);
	};

	const handelDeleteChef = () => {
		deleteChef();
	};

	const deleteChef = async () => {
		try {
			const response = await fetch("http://localhost:8000/chefs", {
				method: "DELETE",
				body: JSON.stringify({
					_id: chefsId,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			dispatch(RemoveChef(data.data));
			navigator("/chefs");
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return (
		<div className="single-chef-page">
			<NavBar />
			<div className="single-chef-container">
				<img src={selectedChef?.img} alt="chef" className="chef-img"></img>
				<button onClick={() => handelDelete()} className="delete-chef">
					Delete
				</button>
				<div className="chef-name">{selectedChef?.name}</div>
				<div className="about-chef">{selectedChef?.description}</div>
				<div className="rests-container">
					{selectedChef?.restaurant?.map((chef: ObjectId) => {
						const data = restaurantsData.filter(
							(rest: IRestaurant) => rest._id === chef
						);
						if (data.length === 0) {
							return null;
						}
						return data.map((rest: IRestaurant, index: number) => (
							<RestaurantCard
								_id={rest._id}
								imgSource={rest.img}
								restName={rest.name}
								chef={""}
								stars={rest.rating}
								key={index}
							/>
						));
					})}
				</div>
			</div>
			{DeleteModal && (
				<div className="confirm-delete-modal">
					<div className="delete-modal-content">
						<div className="delete-modal-header">Are you sure?</div>
						<div className="confirm-buttons">
							<button
								onClick={() => handelDeleteChef()}
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
			<Footer />
		</div>
	);
};

export default SingleChefPage;
