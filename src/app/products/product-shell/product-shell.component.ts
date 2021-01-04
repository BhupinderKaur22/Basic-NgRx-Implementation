import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';

// NgRx
import { Store } from '@ngrx/store';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state';
import { ProductPageActions } from '../state/actions';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product | null>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(ProductPageActions.loadProduct());

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProductId({ productId: product.id }))
  }
}
