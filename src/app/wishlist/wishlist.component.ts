import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  WishList: any = [];

  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _ToastrService: ToastrService) {

  }
  getwishlist(): void {
    this._CartService.getAllWishList().subscribe({
      next: (res: any) => {
        console.log(res)
        this.WishList = res.data
      }
    })
  }
  deleteWishList(id: string): void {
    this._CartService.deleteToWishList(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getwishlist()
      }
    })
  }
  ngOnInit(): void {
    this.getwishlist()
  }
  addToMyCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (res: any) => {
        this._CartService.cartNum.next(res.numOfCartItems)
      },
      error: () => {
        this._ToastrService.error('Hello world!', 'Toastr fun!');
      }, complete: () => {
        this._ToastrService.success('Added to Your Cart', 'Success!', {
          closeButton: true,
          progressBar: true,

        });
      }
    })
  }
}
