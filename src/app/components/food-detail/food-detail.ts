import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Food } from '../../services/food/food';
import { FoodService } from '../../services/food/food.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../services/cart/cart';
import { finalize } from 'rxjs/operators';

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
  cartMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private cartService: Cart,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.loading = true;
      this.errorMessage = null;
      this.cartMessage = null;
      this.food = null;

      const routeId = params.get('id');
      const parsedId = Number(routeId);
      if (!routeId || Number.isNaN(parsedId) || parsedId <= 0) {
        this.errorMessage = 'Invalid food ID.';
        this.loading = false;
        return;
      }

      this.id = parsedId;
      this.getFoodById();
    });
  }

  addToCart(): void {
    if (!this.food) {
      return;
    }

    this.cartService.createCartItem(this.food, 1).subscribe({
      next: () => {
        this.cartMessage = `${this.food?.name} added to cart.`;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cartMessage = 'Failed to add item to cart. Please try again.';
      },
    });
  }

  private getFoodById() {
    this.foodService.getFoodById(this.id).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (data) => {
        this.food = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load food details. Please try again.';
      },
    });
  }
}