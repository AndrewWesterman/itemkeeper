import { GET_ITEMS } from '../actions/types';
import { KnownAction } from '../actions/items';
import { Item } from '../models/Item';
import { Action, Reducer } from 'redux';

export interface ItemState {
    items: Item[];
    isLoading: boolean;
}

const initialState: ItemState = {
    items: [],
    isLoading: true,
};

export const items: Reducer<ItemState> = (
    state: ItemState | undefined,
    incomingAction: Action
): ItemState => {
    if (!state) return initialState;

    const { type, items } = incomingAction as KnownAction;
    switch (type) {
        case GET_ITEMS:
            return { ...state, items, isLoading: false };
        default:
            return state;
    }
};
