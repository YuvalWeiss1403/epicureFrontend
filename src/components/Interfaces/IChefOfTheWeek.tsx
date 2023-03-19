import IRestaurantCard from "./IRestaurantCard";

interface IChefOfTheWeek{
    chefName:string,
    description:string,
    restaurants:IRestaurantCard[]
}

export default IChefOfTheWeek;