import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import DishCard, { IDishes } from "../DishCard/DishCard";
import "./DishModal.css";
import { ObjectId } from "mongoose";
import { useNavigate } from "react-router-dom";
import { RemoveDish } from "../../store/slices/dishslice";

interface IDishId {
	_id: ObjectId;
	closeFunction: Function;
	modalIsOpen: boolean;
}
const DishModal: React.FC<IDishId> = (props: IDishId) => {
	const dishId = props._id;
	const dishesData = useSelector((state: RootState) => state.dish.value);
	const dish: IDishes | undefined = dishesData.find(
		(dish) => dish._id === dishId
	);
	const { modalIsOpen } = props;

	const [DishCounter, setDishCounter] = useState<number>(1);
	const [DeleteModal, setDeleteModal] = useState(false);
	const navigator = useNavigate();
	const dispatch = useDispatch();

	const handelDelete = () => {
		setDeleteModal(true);
	};

	const handelCancel = () => {
		setDeleteModal(false);
	};

	const handelDeleteDish = () => {
		deleteDish();
	};

	const deleteDish = async () => {
		try {
			const response = await fetch("http://localhost:8000/dishes", {
				method: "DELETE",
				body: JSON.stringify({
					_id: dishId,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			dispatch(RemoveDish(data.data));
			navigator(`/`);
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
				<div>
					{dish && (
						<DishCard
							_id={dish._id}
							imgSource={dish.img}
							dishName={dish.name}
							description={dish.about}
							dishType={dish.icons}
							Price={dish.price}
							className={"my-modal-card"}
						/>
					)}
				</div>
				<button onClick={() => handelDelete()} className="delete-dish">
					Delete
				</button>
				<div className="sides">
					<div className="choose-side-heading">Choose a side</div>
					<div className="sides-content">
						<div>
							<input type="radio" />
							<label>White bread</label>
						</div>
						<div>
							<input type="radio" />
							<label>Sticky rice</label>
						</div>
					</div>
				</div>
				<div className="changes">
					<div className="choose-changes-heading">Changes</div>
					<div className="changes-content">
						<div>
							<input type="checkbox" />
							<label>Without peanuts</label>
						</div>
						<div>
							<input type="checkbox" />
							<label>Sticky Less spicy</label>
						</div>
					</div>
				</div>
				<div className="quantity">
					<div className="quantity-heading">Quantity</div>
					<div className="add-remove-quantity-container">
						<button
							onClick={() =>
								DishCounter > 1
									? setDishCounter(DishCounter - 1)
									: setDishCounter(DishCounter)
							}
							disabled={DishCounter === 1 ? true : false}>
							&minus;
						</button>
						<label>{DishCounter}</label>
						<button onClick={() => setDishCounter(DishCounter + 1)}>
							&#43;
						</button>
					</div>
				</div>
				<button className="add-to-cart-button">Add To Cart</button>
				{DeleteModal && (
					<div className="confirm-delete-modal">
						<div className="delete-modal-content">
							<div className="delete-modal-header">Are you sure?</div>
							<div className="confirm-buttons">
								<button
									onClick={() => handelDeleteDish()}
									className="confirm-delete">
									Confirm
								</button>
								<button
									onClick={() => handelCancel()}
									className="cancel-delete">
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	) : (
		<></>
	);
};

export default DishModal;
