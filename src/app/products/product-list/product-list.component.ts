import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';
  @Input() errorMessage: string;
  @Input() displayCode: boolean;
  @Input() products: Product[];
  @Input() selectedProduct: Product | null;

  @Output() onCheckChanged: EventEmitter<boolean>;
  @Output() onAddingNewProduct: EventEmitter<any>;
  @Output() onProductSelected: EventEmitter<Product>;

  constructor() { 
    this.onCheckChanged = new EventEmitter();
    this.onAddingNewProduct = new EventEmitter();
    this.onProductSelected = new EventEmitter();
  }

  checkChanged(): void {
    this.onCheckChanged.emit();
  }

  newProduct(): void {
    this.onAddingNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.onProductSelected.emit(product);
  }

}
