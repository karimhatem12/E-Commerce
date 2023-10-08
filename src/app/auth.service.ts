import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';
  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken')) {
      this.decodeUserToken()
    }
  }

  decodeUserToken() {
    let encoded: string = JSON.stringify(localStorage.getItem('userToken'))
    let decoded: any = jwtDecode(encoded)

    this.userData.next(decoded);

  }
  register(data: FormGroup): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
  }

  login(data: FormGroup): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
  }
}
