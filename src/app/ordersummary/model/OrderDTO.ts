import { FoodItem } from "src/app/shared/model/FoodItem";
import { Restaurant } from "src/app/shared/model/Restaurant";

export interface OrderDTO{

    foodItemList?: FoodItem[];
    userId?: number;
    restaurant?: Restaurant;
}