import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
    maskUserName: boolean
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
)

export const userReducer = createReducer<UserState>(
    { maskUserName: true },
    on(UserActions.maskUserName, (state): UserState => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        }
    })
)