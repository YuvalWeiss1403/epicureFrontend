import React, { useEffect } from "react";
import DishCard, { IDishes } from "../DishCard/DishCard";
import "./SignatureDishOf.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

const SignatureDishOf: React.FC = () => {
	const SignatureDishData = useSelector((state: RootState) => state.dish.value);

	return (
		<div className="popular-dish">
			<div className="popular-dish-heading">SIGNATURE DISH OF:</div>
			<div className="dish-cards">
				{SignatureDishData.map((dish: IDishes, index: number) => {
					if (index < 3 && dish.isSignatureDish) {
						return (
							<DishCard
								_id={dish._id}
								dishName={dish.name}
								imgSource={dish.img}
								description={dish.about}
								dishType={dish.icons}
								Price={dish.price}
								className={"popular-dish-cards"}
								key={index}
							/>
						);
					}
				})}
			</div>
		</div>
	);
};

export default SignatureDishOf;
