import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from 'src/app/state/app.state';
import { ProductState } from './product.reducer'
// Interface
export interface State extends AppState.AppState {
    products: ProductState
}

// Product Slice
const getProductFeatureState = createFeatureSelector<ProductState>(
    'products'
);

// Selectors
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, productId)  => {
        if (productId === 0) {
          return {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
          };
        } else {
          return productId ? state.products.find(p => p.id === productId) : null;
        }
      }
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.errorMessage
);