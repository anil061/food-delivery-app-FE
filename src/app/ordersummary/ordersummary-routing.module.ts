import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersummaryComponent } from './components/ordersummary.component';

const routes: Routes = [
  {path: 'orderSummary', component: OrdersummaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersummaryRoutingModule { }
