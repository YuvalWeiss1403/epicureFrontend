import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./AddDishModal.css";
import { useNavigate, useParams } from "react-router-dom";
import { AddDish } from "../../store/slices/dishslice";

interface IDishId {
	closeFunction: Function;
	modalIsOpen: boolean;
	restId?: string;
}
const AddDishModal: React.FC<IDishId> = (props: IDishId) => {
	const { modalIsOpen } = props;
	const { restaurantId } = useParams();
	const navigator = useNavigate();
	const dispatch = useDispatch();
	const defaultInputValue = {
		name: "",
		time: [""],
		about: "",
		price: 0,
		allergan: [""],
		img: "",
		isSignatureDish: false,
	};
	const [isSignatureDish, setIsSignatureDish] = useState<boolean>(false);
	const [dish, setDish] = useState(defaultInputValue);

	const handelAddDish = () => {
		AddDishToRest();
	};

	const AddDishToRest = async () => {
		try {
			const response = await fetch("http://localhost:8000/dishes", {
				method: "POST",
				body: JSON.stringify({
					name: dish.name,
					time: dish.time,
					about: dish.about,
					price: dish.price,
					allergan: dish.allergan,
					img: dish.img,
					isSignatureDish: dish.isSignatureDish,
					restId: restaurantId,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}
			dispatch(AddDish(data.data));
			navigator(`/restaurants`);
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return modalIsOpen ? (
		<div className="my-modal">
			<button className="close-button" onClick={() => props.closeFunction()}>
				&times;
			</button>
			<div className="modal-content">
				<div className="add-dish-modal-heading">Add a dish to restaurant</div>
				<div className="name dish">
					<div className="heading">Enter dish name: </div>
					<input
						type="text"
						className="dish-input"
						onChange={(e) =>
							setDish({ ...dish, name: e.target.value })
						}></input>
				</div>
				<div className="time dish">
					<div className="heading">Choose when the dish is served</div>
					<div className="time-content">
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setDish({ ...dish, time: [...dish.time, "breakfast"] });
								}}
							/>
							<label>Breakfast</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setDish({ ...dish, time: [...dish.time, "lunch"] });
								}}
							/>
							<label>Lunch</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setDish({ ...dish, time: [...dish.time, "dinner"] });
								}}
							/>
							<label>Dinner</label>
						</div>
					</div>
				</div>
				<div className="about dish">
					<div className="heading">Dish description: </div>
					<input
						type="text"
						className="dish-input"
						onChange={(e) =>
							setDish({ ...dish, about: e.target.value })
						}></input>
				</div>
				<div className="price dish">
					<div className="heading">Enter dish price (only numbers)</div>
					<input
						type="number"
						className="dish-input"
						onChange={(e) =>
							setDish({ ...dish, price: Number(e.target.value) })
						}></input>
				</div>
				<div className="allergan dish">
					<div className="heading">Select dish allergan</div>
					<div className="allergan-content">
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setDish({ ...dish, allergan: [...dish.allergan, "spicy"] });
								}}
							/>
							<label>Spicy</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setDish({ ...dish, allergan: [...dish.allergan, "vegan"] });
								}}
							/>
							<label>Vegan</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setDish({
										...dish,
										allergan: [...dish.allergan, "vegetarian"],
									});
								}}
							/>
							<label>Vegetarian</label>
						</div>
					</div>
				</div>
				<div className="img dish">
					<div className="heading">Enter dish photo URL</div>
					<input
						type="text"
						className="dish-input"
						onChange={(e) => setDish({ ...dish, img: e.target.value })}></input>
				</div>
				<div className="isSignatureDish dish">
					<div className="heading">
						Is this dish the Signature Dish of the restaurant?
					</div>
					<div className="isSignatureDish-content">
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setDish({ ...dish, isSignatureDish: true });
									setIsSignatureDish(true);
								}}
								checked={isSignatureDish ? true : false}
							/>
							<label>Yes</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setDish({ ...dish, isSignatureDish: false });
									setIsSignatureDish(false);
								}}
								checked={isSignatureDish ? false : true}
							/>
							<label>No</label>
						</div>
					</div>
					<button onClick={() => handelAddDish()} className="add-dish-toDb">
						Add
					</button>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default AddDishModal;
