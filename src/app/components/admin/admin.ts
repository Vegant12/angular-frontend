import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Food } from '../../services/food/food';
import { FoodService } from '../../services/food/food.service';
import { Order } from '../../services/order/order';
import { OrderService } from '../../services/order/order.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent implements OnInit {
  foods: Food[] = [];
  orders: Order[] = [];
  loadingFoods = true;
  loadingOrders = true;
  errorMessage: string | null = null;
  formMessage: string | null = null;
  adminUsername = 'admin';
  adminPassword = '';
  isAuthenticated = false;

  foodForm: Food = this.createEmptyFood();
  editingFoodId: number | null = null;

  constructor(
    private foodService: FoodService,
    private orderService: OrderService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    if (!this.isAuthenticated) {
      this.loadingFoods = false;
      this.loadingOrders = false;
      return;
    }

    this.loadAdminData();
  }

  loginAdmin(): void {
    this.errorMessage = null;
    this.formMessage = null;

    if (!this.adminUsername.trim() || !this.adminPassword.trim()) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.authService.login(this.adminUsername.trim(), this.adminPassword).subscribe({
      next: () => {
        this.isAuthenticated = true;
        this.adminPassword = '';
        this.loadAdminData();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Invalid admin credentials.';
        this.cdr.markForCheck();
      },
    });
  }

  logoutAdmin(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.foods = [];
    this.orders = [];
    this.foodForm = this.createEmptyFood();
    this.editingFoodId = null;
    this.formMessage = null;
    this.errorMessage = null;
    this.loadingFoods = false;
    this.loadingOrders = false;
    this.cdr.markForCheck();
  }

  private loadAdminData(): void {
    this.loadFoods();
    this.loadOrders();
  }

  saveFood(): void {
    this.formMessage = null;
    this.errorMessage = null;

    if (!this.foodForm.name?.trim() || this.foodForm.price <= 0) {
      this.errorMessage = 'Name and a valid price are required.';
      return;
    }

    if (this.editingFoodId) {
      this.foodService.updateFood(this.editingFoodId, this.foodForm).subscribe({
        next: () => {
          this.formMessage = 'Food updated successfully.';
          this.cancelEdit();
          this.loadFoods();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to update food.';
        },
      });
      return;
    }

    this.foodService.createFood(this.foodForm).subscribe({
      next: () => {
        this.formMessage = 'Food created successfully.';
        this.foodForm = this.createEmptyFood();
        this.loadFoods();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to create food.';
      },
    });
  }

  editFood(food: Food): void {
    this.editingFoodId = food.id;
    this.foodForm = { ...food };
    this.formMessage = null;
    this.errorMessage = null;
    this.cdr.markForCheck();
  }

  cancelEdit(): void {
    this.editingFoodId = null;
    this.foodForm = this.createEmptyFood();
    this.cdr.markForCheck();
  }

  deleteFood(foodId: number): void {
    this.errorMessage = null;
    this.formMessage = null;

    this.foodService.deleteFood(foodId).subscribe({
      next: () => {
        this.formMessage = 'Food deleted successfully.';
        if (this.editingFoodId === foodId) {
          this.cancelEdit();
        }
        this.loadFoods();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to delete food. It may be referenced by other records.';
      },
    });
  }

  private loadFoods(): void {
    this.loadingFoods = true;
    this.foodService.getFoodsList().subscribe({
      next: (data) => {
        this.foods = data;
        this.loadingFoods = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load foods.';
        this.loadingFoods = false;
      },
    });
  }

  private loadOrders(): void {
    this.loadingOrders = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loadingOrders = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load orders.';
        this.loadingOrders = false;
      },
    });
  }

  private createEmptyFood(): Food {
    return {
      id: 0,
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
    };
  }
}
