import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FoodList } from "./food-list/food-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FoodList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   title = 'angular-frontend';
}
