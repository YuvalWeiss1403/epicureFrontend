import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddRestModal.css";
import { useNavigate } from "react-router-dom";
import { AddRest } from "../../store/slices/RestaurantsSlice";

interface IRestId {
	closeFunction: Function;
	modalIsOpen: boolean;
}
const AddRestModal: React.FC<IRestId> = (props: IRestId) => {
	const { modalIsOpen } = props;
	const navigator = useNavigate();
	const dispatch = useDispatch();
	const [isPopular, setIsPopular] = useState<boolean>(false);
	const [isNew, setIsNew] = useState<boolean>(false);

	const defaultInputValue = {
		name: "",
		address: [""],
		chef: "",
		openHours: [""],
		openDays: [""],
		openYear: 0,
		img: "",
		rating: 0,
		popular: false,
		newRest: false,
	};
	const [rest, setRest] = useState(defaultInputValue);

	const handelAddRest = () => {
		if (
			rest.address &&
			rest.chef &&
			rest.img &&
			rest.name &&
			rest.newRest &&
			rest.openDays &&
			rest.openHours &&
			rest.openYear &&
			rest.popular &&
			rest.rating
		) {
			AddRestToDb();
		} else {
			alert("All input are required");
		}
	};

	const AddRestToDb = async () => {
		try {
			const response = await fetch(
				"https://epicure-server-z5p7.onrender.com/restaurants",
				{
					method: "POST",
					body: JSON.stringify({
						name: rest.name,
						address: rest.address,
						chef: rest.chef,
						openHours: rest.openHours,
						openDays: rest.openDays,
						openYear: rest.openYear,
						img: rest.img,
						rating: rest.rating,
						popular: rest.popular,
						newRest: rest.newRest,
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

			dispatch(AddRest(data.data));
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
				<div className="add-rest-modal-heading">Add a restaurant</div>
				<div className="name rest">
					<div className="heading">Enter restaurant name: </div>
					<input
						type="text"
						className="rest-input"
						onChange={(e) =>
							setRest({ ...rest, name: e.target.value })
						}></input>
				</div>
				<div className="address rest">
					<div className="heading">Enter restaurant address: </div>
					<input
						type="text"
						className="rest-input"
						onChange={(e) =>
							setRest({ ...rest, address: [e.target.value] })
						}></input>
				</div>
				<div className="chef rest">
					<div className="heading">Enter restaurant chef: </div>
					<input
						type="text"
						className="rest-input"
						onChange={(e) =>
							setRest({ ...rest, chef: e.target.value })
						}></input>
				</div>

				<div className="openHours rest">
					<div className="heading">Enter opening hour(only numbers)</div>
					<input
						type="number"
						className="rest-input"
						onChange={(e) =>
							setRest({
								...rest,
								openHours: [...rest.openHours, e.target.value],
							})
						}></input>
					<div className="heading">Enter closing hour(only numbers)</div>
					<input
						type="number"
						className="rest-input"
						onChange={(e) =>
							setRest({
								...rest,
								openHours: [...rest.openHours, e.target.value],
							})
						}></input>
				</div>
				<div className="open-days rest">
					<div className="heading">Select open days</div>
					<div className="open-days-content">
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, openDays: [...rest.openDays, "1"] });
								}}
							/>
							<label>Sunday</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, openDays: [...rest.openDays, "2"] });
								}}
							/>
							<label>Monday</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, openDays: [...rest.openDays, "3"] });
								}}
							/>
							<label>Tuesday</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, openDays: [...rest.openDays, "4"] });
								}}
							/>
							<label>Wednesday</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, openDays: [...rest.openDays, "5"] });
								}}
							/>
							<label>Thursday</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, openDays: [...rest.openDays, "6"] });
								}}
							/>
							<label>Friday</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, openDays: [...rest.openDays, "7"] });
								}}
							/>
							<label>Saturday</label>
						</div>
					</div>
				</div>
				<div className="openYear rest">
					<div className="heading">Enter restaurant opening year: </div>
					<input
						type="number"
						className="rest-input"
						onChange={(e) =>
							setRest({ ...rest, openYear: Number(e.target.value) })
						}></input>
				</div>
				<div className="img dish">
					<div className="heading">Enter dish photo URL</div>
					<input
						type="text"
						className="dish-input"
						onChange={(e) => setRest({ ...rest, img: e.target.value })}></input>
				</div>
				<div className="rating rest">
					<div className="heading">Enter restaurant's rating</div>
					<input
						type="number"
						className="rest-input"
						onChange={(e) =>
							setRest({ ...rest, rating: Number(e.target.value) })
						}></input>
				</div>
				<div className="is-popular dish">
					<div className="heading">Is this restaurant popular?</div>
					<div className="is-popular-content">
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, popular: true });
									setIsPopular(true);
								}}
								checked={isPopular ? true : false}
							/>
							<label>Yes</label>
						</div>
						<div>
							<input
								type="checkbox"
								onChange={() => {
									setRest({ ...rest, popular: false });
									setIsPopular(false);
								}}
								checked={isPopular ? false : true}
							/>
							<label>No</label>
						</div>
					</div>
					<div className="is-new dish">
						<div className="heading">Is this restaurant new?</div>
						<div className="is-new-content">
							<div>
								<input
									type="checkbox"
									onChange={() => {
										setRest({ ...rest, newRest: true });
										setIsNew(true);
									}}
									checked={isNew ? true : false}
								/>
								<label>Yes</label>
							</div>
							<div>
								<input
									type="checkbox"
									onChange={() => {
										setRest({ ...rest, newRest: false });
										setIsNew(false);
									}}
									checked={isNew ? false : true}
								/>
								<label>No</label>
							</div>
						</div>
						<button onClick={() => handelAddRest()} className="add-rest-toDb">
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default AddRestModal;
