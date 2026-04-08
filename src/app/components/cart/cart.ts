import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart, CartItem } from '../../services/cart/cart';
import { OrderService } from '../../services/order/order.service';
import { forkJoin, of } from 'rxjs';

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
  checkoutMessage: string | null = null;
  isCheckingOut = false;

  constructor(
    private cartService: Cart,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

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
    this.updateQuantity(item, item.quantity + 1)
    this.cdr.markForCheck();;
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity <= 1) {
      return;
    }
    this.updateQuantity(item, item.quantity - 1);
    this.cdr.markForCheck();
  }

  removeItem(item: CartItem): void {
    this.cartService.deleteCartItem(item.id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to remove item from cart. Please try again.';
      },
    });
  }

  checkout(): void {
    if (this.cartItems.length === 0 || this.isCheckingOut) {
      return;
    }

    this.isCheckingOut = true;
    this.errorMessage = null;
    this.checkoutMessage = null;

    const orderPayload = {
      status: 'PENDING',
      items: this.cartItems.map((item) => ({
        food: item.food,
        quantity: item.quantity,
        price: item.food.price,
      })),
    };

    this.orderService.createOrder(orderPayload).subscribe({
      next: (createdOrder) => {
        const removeCalls = this.cartItems.map((item) =>
          this.cartService.deleteCartItem(item.id)
        );

        const removeRequest$ = removeCalls.length > 0 ? forkJoin(removeCalls) : of([]);
        removeRequest$.subscribe({
          next: () => {
            this.cartItems = [];
            this.checkoutMessage = `Order #${createdOrder.id ?? ''} placed successfully.`;
            this.isCheckingOut = false;
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Order created, but failed to clear cart items.';
            this.isCheckingOut = false;
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to checkout. Please try again.';
        this.isCheckingOut = false;
      },
    });

    this.cdr.markForCheck();
  }

  private loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.loading = false;
        this.cdr.markForCheck();
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
          this.cdr.markForCheck();
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to update quantity. Please try again.';
      },
    });
  }
}
