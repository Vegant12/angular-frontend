import { Food } from '../food/food';

export interface OrderItem {
  id?: number;
  food: Food;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  orderDate?: string;
  status: string;
  totalAmount?: number;
  items: OrderItem[];
}
