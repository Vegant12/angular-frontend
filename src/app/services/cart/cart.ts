import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../food/food';

export class CartItem {
  id!: number;
  food!: Food;
  quantity!: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private baseURL = 'http://localhost:8080/api/v1/carts';

  constructor(private httpClient: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(`${this.baseURL}`);
  }

  createCartItem(food: Food, quantity: number = 1): Observable<CartItem> {
    return this.httpClient.post<CartItem>(this.baseURL, {
      food,
      quantity,
    });
  }

  updateCartItem(id: number, quantity: number): Observable<CartItem> {
    return this.httpClient.put<CartItem>(`${this.baseURL}/${id}`, { quantity });
  }

  deleteCartItem(id: number): Observable<{ deleted: boolean }> {
    return this.httpClient.delete<{ deleted: boolean }>(`${this.baseURL}/${id}`);
  }
}
