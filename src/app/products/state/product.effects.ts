
import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductApiActions, ProductPageActions } from './actions/index'

@Injectable()
export class ProductEffects {

    public loadProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.loadProduct),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductApiActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductApiActions.loadProductsFailure({ errorMessage: error })))
            ))  
        )
    });

    public updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.updateProduct),
            concatMap(action => this.productService.updateProduct(action.product).pipe(
                map(product => ProductApiActions.updateProductSuccess({ product })),
                catchError(error => of(ProductApiActions.updateProductFailure({ errorMessage: error })))
            ))  
        )
    });

    public deleteProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.deleteProduct),
            concatMap(action => this.productService.deleteProduct(action.productId).pipe(
                map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
                catchError(error => of(ProductApiActions.updateProductFailure({ errorMessage: error })))
            ))  
        )
    });

    public createProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.createProduct),
            concatMap(action => this.productService.createProduct(action.product).pipe(
                map(product => ProductApiActions.createProductSuccess({ product })),
                catchError(error => of(ProductApiActions.updateProductFailure({ errorMessage: error })))
            ))  
        )
    });

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {}
}
