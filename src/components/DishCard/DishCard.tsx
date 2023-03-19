import React, { useState } from "react";
import "./DishCard.css";
import IDishCard from "../Interfaces/IDishCard";
import spicyImg from "../../assets/spicy.svg";
import vegetarianImg from "../../assets/vegetarian.svg";
import veganImg from "../../assets/Vegan.svg";
import DishModal from "../DishModal/DishModal";
import { ObjectId } from "mongoose";

export interface IDishes {
	_id: ObjectId;
	name: string;
	time: string[];
	about: string;
	price: number;
	allergan: string[];
	icons: string[];
	sides: string[];
	changes: string[];
	img: string;
	isSignatureDish: boolean;
}
export interface IDishesState {
	value: IDishes[];
}

const DishCard: React.FC<IDishCard> = (props: IDishCard) => {
	const typesEnum: { [key: string]: string } = {
		spicy: spicyImg,
		vegetarian: vegetarianImg,
		vegan: veganImg,
	};

	const { _id, dishName, imgSource, description, dishType, Price, className } =
		props;

	const [modalIsOpen, setIsOpen] = useState<boolean>(false);

	const openModal = (): void => {
		setIsOpen(true);
	};

	const closeModal = (): void => {
		setIsOpen(false);
	};

	return (
		<>
			<div className="dish-card-element" id={className} onClick={openModal}>
				<img className="dish-img" alt="dish" src={imgSource}></img>
				<div className="dish-name">{dishName}</div>
				<div className="dishTypes">
					{dishType.map((type: string, index: number) => {
						const typeImg: string = typesEnum[type];
						return (
							<img
								src={typeImg}
								className={`dish-type-img`}
								alt={"dish-type"}
								key={index}
							/>
						);
					})}
				</div>
				<div className="dish-description">{description}</div>
				<div className="price">
					<hr />
					<div className="price-value"> {Price}&#8362;</div>
					<hr />
				</div>
			</div>
			<DishModal
				_id={_id}
				closeFunction={closeModal}
				modalIsOpen={modalIsOpen}
			/>
		</>
	);
};

export default DishCard;
