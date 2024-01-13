import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersummaryRoutingModule } from './ordersummary-routing.module';
import { OrdersummaryComponent } from './components/ordersummary.component';


@NgModule({
  declarations: [
    OrdersummaryComponent
  ],
  imports: [
    CommonModule,
    OrdersummaryRoutingModule
  ]
})
export class OrdersummaryModule { }
