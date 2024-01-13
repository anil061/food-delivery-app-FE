import { Component } from '@angular/core';
import { OrderDTO } from '../model/OrderDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersummaryService } from '../service/ordersummary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent {

  orderSummary?: OrderDTO;
  obj: any;
  total?: any;
  showDialog: boolean = false;

  constructor(private route: ActivatedRoute, private orderService: OrdersummaryService, private router: Router) { }
  
  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj.userId =1;
    this.orderSummary = this.obj;

   this.total = this.orderSummary?.foodItemList?.reduce((accumulator, currentValue) =>{
    return accumulator + (currentValue.quantity * currentValue.price);
   }, 0);

  }

  saveOrder(){   
    this.orderService.saveOrder(this.orderSummary).subscribe(
        (response) => {
          console.error("response==>", response);
            this.showDialog = true;
        },
        error => {
          console.error('Failed to save data:', error);
        }
      );
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']); // Replace '/home' with the actual route for your home page
  }


}
