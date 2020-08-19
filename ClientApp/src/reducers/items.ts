import {
    GET_ITEMS,
    DELETE_ITEM,
    GET_ITEM,
    CREATE_ITEM,
    UPDATE_ITEM,
} from '../actions/types';
import { KnownAction, GetItemsAction, GetItemAction } from '../actions/items';
import { Item } from '../models/Item';
import { Action, Reducer } from 'redux';

export interface ItemState {
    item?: Item;
    items: Item[];
    isLoading: boolean;
}

const initialState: ItemState = {
    item: undefined,
    items: [],
    isLoading: true,
};

export const items: Reducer<ItemState> = (
    state: ItemState | undefined,
    incomingAction: Action
): ItemState => {
    if (!state) return initialState;

    const { type } = incomingAction as KnownAction;
    switch (type) {
        case GET_ITEMS:
        case CREATE_ITEM:
        case UPDATE_ITEM:
        case DELETE_ITEM:
            const { items } = incomingAction as GetItemsAction;
            return { ...state, items, isLoading: false };
        case GET_ITEM:
            const { item } = incomingAction as GetItemAction;
            return { ...state, item, isLoading: false };
        default:
            return state;
    }
};
