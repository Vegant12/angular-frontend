import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Food } from '../food';
import { FoodService } from '../food.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './food-detail.html',
  styleUrls: ['./food-detail.css'],
})
export class FoodDetail implements OnInit {

  id!: number;
  food: Food | null = null;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.loading = true;
      this.errorMessage = null;
      this.food = null;
      this.getFoodById();
    });
  }

  private getFoodById() {
    this.foodService.getFoodById(this.id).subscribe({
      next: (data) => {
        this.food = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load food details. Please try again.';
        this.loading = false;
      },
    });
  }
}