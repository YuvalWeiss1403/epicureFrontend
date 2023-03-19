import { ObjectId } from "mongoose";

interface IDishCard {
	_id: ObjectId;
	imgSource: string;
	dishName: string;
	description: string;
	dishType: string[];
	Price: number;
	className: string;
}
export default IDishCard;
