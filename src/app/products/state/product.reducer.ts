import { createReducer, on} from '@ngrx/store';
import { Product } from '../product';
import { ProductPageActions, ProductApiActions } from './actions';

// Interface
export interface ProductState {
    showProductCode: boolean,
    currentProductId: number | null,
    products: Product[],
    errorMessage: string
}

// Initial State of the Product State
const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    errorMessage: ''
}

//  Reducers
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductPageActions.setCurrentProductId, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.productId
        }
    }),
    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        }
    }),
    on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        }
    }),
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            errorMessage: ''
        }
    }),
    on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            errorMessage: action.errorMessage
        }
    }),
    on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => item.id === action.product.id ? action.product : item
        );
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            errorMessage: ''
        }
    }),
    on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            errorMessage: action.errorMessage
        }
    }),
    on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.filter(
            item => item.id !== action.productId
        );
        return {
            ...state,
            products: updatedProducts,
            errorMessage: ''
        }
    }),
    on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            errorMessage: action.errorMessage
        }
    }),
    on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
        const updatedProducts = [...state.products, action.product]
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            errorMessage: ''
        }
    }),
    on(ProductApiActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            errorMessage: action.errorMessage
        }
    })
)