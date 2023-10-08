import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogedIn: boolean = false
  myCartNum: number = 0
  constructor(private _AuthService: AuthService, private _CartService: CartService) {
    _CartService.cartNum.subscribe({
      next: (val) => {
        this.myCartNum = val
      }
    })
    _AuthService.userData.subscribe({
      next: () => {
        if (_AuthService.userData.getValue()) {
          this.isLogedIn = true
        } else {
          this.isLogedIn = false
        }
      }
    })
  }

  LogOut() {
    this.isLogedIn = false
    localStorage.removeItem('userToken')
  }
}
