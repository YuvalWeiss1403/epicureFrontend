import React from "react";
import spicy from "../../assets/spicy.svg";
import vegetarian from "../../assets/vegetarian.svg";
import vegan from "../../assets/Vegan.svg";

import "./IconsMeaning.css";

enum IconType {
	Spicy = "spicy",
	Vegetarian = "vegetarian",
	Vegan = "vegan",
}

const iconData = [
	{
		type: IconType.Spicy,
		image: spicy,
		alt: "spicy",
		heading: "Spicy",
	},
	{
		type: IconType.Vegetarian,
		image: vegetarian,
		alt: "vegetarian",
		heading: "Vegetarian",
	},
	{
		type: IconType.Vegan,
		image: vegan,
		alt: "vegan",
		heading: "Vegan",
	},
];

const IconsMeaning: React.FC = () => {
	return (
		<div className="icons-meaning">
			<div className="meaning-heading">THE MEANING OF OUR ICONS:</div>
			<div className="icons">
				{iconData.map((icon) => (
					<div className={icon.type}>
						<img alt={icon.alt} src={icon.image}></img>
						<div className="spicy-heading">{icon.heading}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default IconsMeaning;
