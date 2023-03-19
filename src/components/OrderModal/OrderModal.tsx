import React from "react";
import OrderDishCard from "../OrderDishCard/OrderDishCard";
import "./OrderModal.css";

interface IOrderModal {
	closeFunction: Function;
	modalIsOpen: boolean;
}
const OrderModal: React.FC<IOrderModal> = (props: IOrderModal) => {
	return props.modalIsOpen ? (
		<div className="my-order-modal">
			<div className="order-modal-content">
				<div className="your-order-heading">YOUR ORDER</div>
				<div className="order-rest-name">{"Mashya"}</div>
				<div className="dishes-in-order-container">
					<OrderDishCard
						img={"/assets/restaurants/claro.svg"}
						name={"Pad Ki Mao"}
						price={88}
						changes={"Less spicy"}
						sides={"White bread"}
						dishCount={2}
					/>
					<OrderDishCard
						img={"/assets/restaurants/claro.svg"}
						name={"Pad Ki Mao"}
						price={88}
						changes={"Less spicy"}
						sides={"White bread"}
						dishCount={2}
					/>
					<OrderDishCard
						img={"/assets/restaurants/claro.svg"}
						name={"Pad Ki Mao"}
						price={88}
						changes={"Less spicy"}
						sides={"White bread"}
						dishCount={2}
					/>
				</div>
				<hr></hr>
				<div className="add-a-comment">Add A Comment</div>
				<textarea
					className="special-requests"
					placeholder="Special requests, allergies, detary restrictions, etc."></textarea>
				<button id="checkout">Checkout</button>
				<button id="order-history">Order history</button>
			</div>
		</div>
	) : (
		<></>
	);
};

export default OrderModal;
