import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Food } from "./food";

@Injectable({
    providedIn: 'root'
})

export class FoodService {

    private baseURL = "http://localhost:8080/api/v1/foods";

    constructor(private httpClient: HttpClient){ }

    // GET all foods
    getFoodsList(): Observable<Food[]>{
        return this.httpClient.get<Food[]>(`${this.baseURL}`);
    }

    // GET food by id
    getFoodById(id: number): Observable<Food>{
        return this.httpClient.get<Food>(`${this.baseURL}/${id}`);
    }
        
    // POST create food
    createFood(food: Food): Observable<Food> {
        return this.httpClient.post<Food>(this.baseURL, food);
    }
}