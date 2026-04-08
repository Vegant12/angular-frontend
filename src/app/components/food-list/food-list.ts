import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '../../services/food/food';
import { FoodService } from '../../services/food/food.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './food-list.html',
  styleUrl: './food-list.css',
})
export class FoodList implements OnInit{
  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.getFoods();
  }

  private getFoods(){
    this.foodService.getFoodsList().subscribe(data => {
      this.foods = data;
      this.cdr.markForCheck();
    })
  }
}
