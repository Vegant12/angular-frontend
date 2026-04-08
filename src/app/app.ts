import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { FoodList } from "./food-list/food-list";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLinkWithHref
],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
   title = 'Food App';
}
