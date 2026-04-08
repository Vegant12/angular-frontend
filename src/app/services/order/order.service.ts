import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseURL = 'http://localhost:8080/api/v1/orders';

  constructor(private httpClient: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.baseURL, order);
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.baseURL);
  }
}
