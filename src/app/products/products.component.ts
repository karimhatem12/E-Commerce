import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  searchTerm: string = '';
  ProductsList: Product[] = [];
  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _ToastrService: ToastrService) {
  }
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this._ProductsService.getAllProducts().subscribe({

      next: (res: any) => {
        console.log(res.data);
        this.ProductsList = res.data
      }

    })
  }
  addToMyCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (res: any) => {
        console.log(res)
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
