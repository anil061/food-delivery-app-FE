import { ChangeDetectionStrategy,Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/shared/model/Restaurant';
import { RestaurantService } from '../service/restaurant.service';


@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantListingComponent {


  public restaurantList: Restaurant[];

  ngOnInit() {
    this.getAllRestaurants();
  }

  ngAfterContentInit(){
    this.getAllRestaurants();
  }

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurantList = data;
      }
    )
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  getRandomImage(): string {
    const imageCount = 8; // Adjust this number based on the number of images in your asset folder
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `${randomIndex}.jpg`; // Replace with your image filename pattern
  }

  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue', id]);
  }
}
