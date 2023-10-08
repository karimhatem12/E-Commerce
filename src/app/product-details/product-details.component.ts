import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  productId: string = ''
  productData: any
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: ['<i class="fa-solid fa-arrow-alt-circle-left"></i>', '<i class="fa-solid fa-arrow-alt-circle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute) {
    this.productId = _ActivatedRoute.snapshot.params['id']
    this.getProduct()
  }
  getProduct() {
    this._ProductsService.getProductById(this.productId).subscribe({
      next: (res: any) => {
        this.productData = res.data
        console.log(res.data)
        console.log(this.productData)
      }
    })
  }
}
