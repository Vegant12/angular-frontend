import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart, CartItem } from '../../services/cart/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private cartService: Cart) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  get cartTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.food.price * item.quantity,
      0
    );
  }

  increaseQuantity(item: CartItem): void {
    this.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity <= 1) {
      return;
    }
    this.updateQuantity(item, item.quantity - 1);
  }

  removeItem(item: CartItem): void {
    this.cartService.deleteCartItem(item.id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to remove item from cart. Please try again.';
      },
    });
  }

  private loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load cart items. Please try again.';
        this.loading = false;
      },
    });
  }

  private updateQuantity(item: CartItem, quantity: number): void {
    this.cartService.updateCartItem(item.id, quantity).subscribe({
      next: (updatedItem) => {
        const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
        if (index !== -1) {
          this.cartItems[index] = updatedItem;
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to update quantity. Please try again.';
      },
    });
  }
}
