import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  CategoryList: any = [];
  constructor(private _CartService: CartService) {
    this.getthedata()
  }
  getthedata(): void {
    this._CartService.getAllCategorys().subscribe({
      next: (res: any) => {
        console.log(res)
        this.CategoryList = res.data
      }
    })
  }
}
