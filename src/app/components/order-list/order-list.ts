import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../services/order/order';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load orders. Please try again.';
        this.loading = false;
      },
    });
  }
}
