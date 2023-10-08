import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: any
  constructor(private _CartService: CartService, private _ToastrService: ToastrService) { }
  ngOnInit(): void {
    this.getMyCart()
  }
  getMyCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res)
        this.cartData = res.data
      }
    })
  }

  deleteItem(id: string) {
    this._CartService.deleteItem(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: () => { },
      complete: () => {
        this.getMyCart()
        this._ToastrService.success('Deleted from your cart', 'Deleted')
      }
    })
  }

  updateItem(id: string, count: number) {
    this._CartService.updateItem(id, count).subscribe({
      next: (res) => {
        console.log(res)
      }, error: () => {

      }, complete: () => {
        this.getMyCart()
        this._ToastrService.success('Updated from your cart', 'Updated')
      }
    })
  }
}
