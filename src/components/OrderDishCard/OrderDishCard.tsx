import React from "react";
import "./OrderDishCard.css";

interface IOrderDishCard {
	img: string;
	name: string;
	price: number;
	changes: string;
	sides: string;
	dishCount: number;
}

const OrderDishCard: React.FC<IOrderDishCard> = (props: IOrderDishCard) => {
	const { img, name, price, dishCount, changes, sides } = props;

	return (
		<>
			<div className="order-dish-card">
				<img className="dish-img" alt="dish" src={img}></img>
				<div className="order-dish-content">
					<div className="name-and-count">
						<div className="dish-counter">{dishCount}</div>
						<div className="name-and-price">
							<div className="dish-name">{name}</div>
							<div className="price">₪{price}.00</div>
						</div>
					</div>
					<div className="sides-and-changes">
						<div className="sides">{sides}</div>
						<hr />
						<div className="changes">{changes}</div>
					</div>
					<div className="total-dishes-price">₪{dishCount * price}</div>
				</div>
			</div>
		</>
	);
};

export default OrderDishCard;
