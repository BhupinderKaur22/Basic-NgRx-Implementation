import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleProductCode = createAction(
    '[Product Page] Toggle Product Code'
);

export const setCurrentProductId = createAction(
    '[Product Page] Set Current Product',
    props<{ productId: number }>()
);

export const clearCurrentProduct = createAction(
    '[Product Page] Clear Product Code'
);

export const initializeCurrentProduct = createAction(
    '[Product Page] Initialize Product Code'
);

export const loadProduct = createAction(
    '[Product Page] Load'
);

export const updateProduct = createAction(
    '[Product Page] Update',
    props<{ product: Product }>()
);

export const deleteProduct = createAction(
    '[Product Page] Delete',
    props<{ productId: number }>()
);

export const createProduct = createAction(
    '[Product Page] Create',
    props<{ product: Product }>()
);