import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  private hasStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((res) => {
          if (this.hasStorage()) {
            localStorage.setItem('token', res.token);
          }
        })
      );
  }

  logout(): void {
    if (this.hasStorage()) {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    if (!this.hasStorage()) {
      return null;
    }
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
}