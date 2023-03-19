import React, { useState } from "react";
import "./ChefsPageAll.css";
import ChefCard from "../ChefCard/ChefCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { IChefs } from "../Chefs/Chefs";
import AddChefModal from "../AddChefModal/AddChefModal";

const ChefsPageAll: React.FC = () => {
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);

	const openModal = (): void => {
		setIsOpen(true);
	};

	const closeModal = (): void => {
		setIsOpen(false);
	};
	const chefsData = useSelector((state: RootState) => state.chef.value);
	return (
		<div className="chefs-container">
			<button onClick={() => openModal()} className="add-rest">
				Add Chef
			</button>
			{chefsData.map((chef: IChefs, index: number) => {
				return (
					<ChefCard
						key={index}
						chefName={chef.name}
						chefImg={chef.img}
						_id={chef._id}
					/>
				);
			})}
			<AddChefModal
				closeFunction={closeModal}
				modalIsOpen={modalIsOpen}></AddChefModal>
		</div>
	);
};

export default ChefsPageAll;
