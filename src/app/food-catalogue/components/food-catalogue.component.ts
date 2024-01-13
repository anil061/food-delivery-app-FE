import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodCataloguePage } from 'src/app/shared/model/FoodCataloguePage';
import { FoodItem } from 'src/app/shared/model/FoodItem';
import { FoodItemService } from '../service/food-item.service';
import { Restaurant } from 'src/app/shared/model/Restaurant';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css']
})
export class FoodCatalogueComponent {

  restaurantId: number;
  foodItemResponse: FoodCataloguePage;
  restaurantData: Restaurant;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage;

  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) {
  }

   ngOnInit() {

    this.route.params.subscribe(params => {
      this.restaurantId = + params['id'];
    });

    this.getFoodItemsByRestaurant(this.restaurantId);
    
  }
  getFoodItemsByRestaurant(restaurant: number) {
    
    this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe(
      (data: FoodCataloguePage) => {
        console.error("getFoodItemsByRestaurant" + JSON.stringify(data));
        this.foodItemResponse = data;
        this.restaurantData  = data.restaurant;
        console.info("The values for foodItemResponse " + this.foodItemResponse);
      }
    )
  }

  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }
  
  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }

  onCheckOut() {
    console.error("this.foodItemCart==>", this.foodItemCart);
    this.foodItemCart;
    this.orderSummary = {
      foodItemList: [],
      restaurant: null!
    }
    console.log("FoodItemResponse::foodItemsList" + this.foodItemResponse.foodItemList);
    console.log("FoodItemResponse::restaurant" + this.foodItemResponse.restaurant);
    this.orderSummary.foodItemList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }
}
