import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  CategoryList: any = [];
  constructor(private _CartService: CartService) {
    this.getthedata()
  }
  getthedata(): void {
    this._CartService.getAllBrads().subscribe({
      next: (res: any) => {
        console.log(res)
        this.CategoryList = res.data
      }
    })
  }
}
