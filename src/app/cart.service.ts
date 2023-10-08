import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNum = new BehaviorSubject(0)
  pathUrl: string = 'https://ecommerce.routemisr.com/api/v1'
  TokenHeaders: any = {
    'token': localStorage.getItem('userToken')
  }
  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartNum.next(res.numOfCartItems)
      }
    })
  }

  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${this.pathUrl}/cart`, { productId: id }, { headers: this.TokenHeaders })
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.pathUrl}/cart`, { headers: this.TokenHeaders })
  }

  deleteItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.pathUrl}/cart/${id}`, { headers: this.TokenHeaders })
  }

  updateItem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.pathUrl}/cart/${id}`, { count: count }, { headers: this.TokenHeaders })
  }

  onlinePayment(cartId: string, data: FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.pathUrl}/orders/checkout-session/${cartId}?url=https://karimhatem12.github.io/E-Commerce/home`, { shippingAddress: data }, { headers: this.TokenHeaders })
  }

  getAllCategorys(): Observable<any> {
    return this._HttpClient.get(`${this.pathUrl}/categories`)
  }

  getAllBrads(): Observable<any> {
    return this._HttpClient.get(`${this.pathUrl}/brands`)
  }
  getAllWishList(): Observable<any> {
    return this._HttpClient.get(`${this.pathUrl}/wishlist`, { headers: this.TokenHeaders })
  }
  addToWishList(id: string): Observable<any> {
    return this._HttpClient.post(`${this.pathUrl}/wishlist`, { "productId": id }, { headers: this.TokenHeaders })
  }
  deleteToWishList(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.pathUrl}/wishlist/${id}`, { headers: this.TokenHeaders })
  }
}
