import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchTerm: string = '';
  ProductsList: Product[] = [];
  CategoryList: any = [];
  WishList: any = [];
  isWishitem: boolean = false
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ['<i class="fa-solid fa-arrow-alt-circle-left"></i>', '<i class="fa-solid fa-arrow-alt-circle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _ToastrService: ToastrService) {
    this.getthedata()
    this.getwishlist()
  }

  getwishlist(): void {
    this._CartService.getAllWishList().subscribe({
      next: (res: any) => {
        this.WishList = res.data
      }
    })
  }
  isWishItem(id: string): boolean {
    for (let item = 0; item < this.WishList.length; item++) {
      if (id == this.WishList[item]._id) {
        return true
      }
    }
    return false
  }
  deleteWishList(id: string): void {
    this._CartService.deleteToWishList(id).subscribe({
      next: (res: any) => {
        this.getwishlist()
        this._ToastrService.success(res.message, res.status, {
          closeButton: true,
          progressBar: true,

        });
      }
    })
  }
  addWishList(id: string): void {
    console.log(id)
    this._CartService.addToWishList(id).subscribe({
      next: (res: any) => {
        this.getwishlist()
        this._ToastrService.success(res.message, res.status, {
          closeButton: true,
          progressBar: true,

        });
      }
    })
  }
  getthedata(): void {
    this._CartService.getAllCategorys().subscribe({
      next: (res: any) => {
        this.CategoryList = res.data
      }
    })
  }
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this._ProductsService.getAllProducts().subscribe({

      next: (res: any) => {
        this.ProductsList = res.data
      }

    })
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
