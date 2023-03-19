import { ObjectId } from "mongoose";

interface IChefCard {
	chefName: string;
	chefImg: string;
	_id: ObjectId;
}

export default IChefCard;
