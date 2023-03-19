import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddChefModal.css";
import { useNavigate } from "react-router-dom";
import { AddChef } from "../../store/slices/ChefsSlice";

interface IRestId {
	closeFunction: Function;
	modalIsOpen: boolean;
}
const AddChefModal: React.FC<IRestId> = (props: IRestId) => {
	const { modalIsOpen } = props;
	const navigator = useNavigate();
	const dispatch = useDispatch();

	const defaultInputValue = {
		name: "",
		age: 0,
		img: "",
		description: "",
		chefOfTheWeek: true,
		isChefNew: true,
		mostViewed: false,
	};
	const [chef, setChef] = useState(defaultInputValue);

	const handelAddChef = () => {
		if (chef.name && chef.age && chef.img && chef.description) {
			AddChefToDb();
		} else {
			alert("All input are required");
		}
	};

	const AddChefToDb = async () => {
		try {
			const response = await fetch("http://localhost:8000/chefs", {
				method: "POST",
				body: JSON.stringify({
					name: chef.name,
					age: chef.age,
					img: chef.img,
					description: chef.description,
					chefOfTheWeek: chef.chefOfTheWeek,
					isChefNew: chef.isChefNew,
					mostViewed: chef.mostViewed,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			dispatch(AddChef(data.data));
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
				<div className="add-chef-modal-heading">Add a Chef</div>
				<div className="name chef">
					<div className="heading">Enter chef name: </div>
					<input
						type="text"
						className="chef-input"
						onChange={(e) =>
							setChef({ ...chef, name: e.target.value })
						}></input>
				</div>
				<div className="age chef">
					<div className="heading">Enter chef's age: </div>
					<input
						type="number"
						className="chef-input"
						onChange={(e) =>
							setChef({ ...chef, age: Number(e.target.value) })
						}></input>
				</div>
				<div className="img chef">
					<div className="heading">Enter dish photo URL</div>
					<input
						type="text"
						className="chef-input"
						onChange={(e) => setChef({ ...chef, img: e.target.value })}></input>
				</div>
				<div className="description chef">
					<div className="heading">Enter chef description: </div>
					<input
						type="text"
						className="chef-input"
						onChange={(e) =>
							setChef({ ...chef, description: e.target.value })
						}></input>
				</div>

				<button onClick={() => handelAddChef()} className="add-chef-toDb">
					Add
				</button>
			</div>
		</div>
	) : (
		<></>
	);
};

export default AddChefModal;
