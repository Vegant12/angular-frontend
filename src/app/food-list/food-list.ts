import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../food';

@Component({
  selector: 'app-food-list',
  imports: [CommonModule],
  templateUrl: './food-list.html',
  styleUrl: './food-list.css',
})
export class FoodList {
  foods: Food[] = [];

  ngOnInit(): void {
    this.foods = [{
      "id": 1,
      "name": "burger",
      "description": "classic burger",
      "imageUrl": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      "price": 22000
    }]
  }
}
