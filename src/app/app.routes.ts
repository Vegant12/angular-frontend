
import { Routes } from '@angular/router';
import { FoodList } from './components/food-list/food-list';
import { FoodDetail } from './components/food-detail/food-detail';
import { CartComponent } from './components/cart/cart';
import { OrderListComponent } from './components/order-list/order-list';

export const routes: Routes = [
    {path: 'foods', component: FoodList},
    {path: 'cart', component: CartComponent},
    {path: 'orders', component: OrderListComponent},
    {path: '', redirectTo: 'foods', pathMatch: 'full'},
    {path: 'foods/:id', component: FoodDetail},
];

