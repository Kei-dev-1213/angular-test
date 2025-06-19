import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public isCartVisible = false;
  private productService = inject(ProductService);
  public cartItems: Product[] = [];
  public totalPrice = 0;
  // 登録
  private addToCartSubscription = this.productService.onAddToCart$.subscribe(
    (res: Product) => {
      this.cartItems.unshift(res);
    }
  );

  public ngOnDestroy() {
    if (this.addToCartSubscription) {
      this.addToCartSubscription.unsubscribe();
    }
  }

  public trackByIndex(index: number, item: Product) {
    return index;
  }

  // カート表示切替
  public toggleCartVisible() {
    this.isCartVisible = !this.isCartVisible;
  }

  public calculateTotalPrice() {
    return (this.totalPrice = this.cartItems.reduce(
      (accu, curr) => accu + curr.price,
      0
    ));
  }

  public deleteFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }
}
