
import { Routes } from '@angular/router';
import { FoodList } from './components/food-list/food-list';
import { FoodDetail } from './components/food-detail/food-detail';
import { CartComponent } from './components/cart/cart';
import { OrderListComponent } from './components/order-list/order-list';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
    {path: 'foods', component: FoodList},
    {path: 'cart', component: CartComponent},
    {path: 'admin', component: AdminComponent},
    {path: '', redirectTo: 'foods', pathMatch: 'full'},
    {path: 'foods/:id', component: FoodDetail},
];

