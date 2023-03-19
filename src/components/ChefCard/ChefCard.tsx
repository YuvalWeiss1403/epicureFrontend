import React from "react";
import "./ChefCard.css";
import IChefCard from "../Interfaces/IChefCard";
import { useNavigate } from "react-router";

const ChefCard: React.FC<IChefCard> = (props: IChefCard) => {
	const navigator = useNavigate();

	return (
		<div
			className="chef-card-element"
			onClick={() => {
				navigator(`/chefs/${props._id}`);
			}}>
			<img src={props.chefImg} alt="chef" className="chef-image"></img>
			<div className="chef-name">{props.chefName}</div>
		</div>
	);
};

export default ChefCard;
