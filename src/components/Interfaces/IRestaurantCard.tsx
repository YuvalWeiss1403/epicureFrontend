import { ObjectId } from "mongoose";
interface IRestaurantCard {
	_id: ObjectId;
	imgSource: string;
	restName: string;
	chef: string;
	stars: number;
}

export default IRestaurantCard;
