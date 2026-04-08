
import { Routes } from '@angular/router';
import { FoodList } from './food-list/food-list';
import { FoodDetail } from './food-detail/food-detail';

export const routes: Routes = [
    {path: 'foods', component: FoodList},
    {path: '', redirectTo: 'foods', pathMatch: 'full'},
    {path: 'foods/:id', component: FoodDetail},
];

