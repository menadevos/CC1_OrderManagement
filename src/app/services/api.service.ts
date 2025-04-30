import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients`);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getOrderLines(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orderlines`);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order);
  }

  createOrderLine(orderLine: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orderlines`, orderLine);
  }

  updateOrderLine(id: string, orderLine: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orderlines/${id}`, orderLine);
  }
}
