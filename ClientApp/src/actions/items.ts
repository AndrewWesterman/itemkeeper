import { Item } from '../models/Item';
import { AppThunkAction } from '../store';

import { GET_ITEMS, DELETE_ITEM } from './types';

export interface GetItemsAction {
    type: String;
    items: Item[];
}

export type KnownAction = GetItemsAction;

export const actions = {
    // Get the items from server
    getItems: (): AppThunkAction<KnownAction> => async (dispatch) => {
        try {
            const items: Item[] = await fetch('/api/items').then((res) =>
                res.json()
            );
            dispatch({ type: GET_ITEMS, items });
        } catch (err) {}
    },

    // Get the items from server
    deleteItem: (id?: number): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        if (!id) return;

        try {
            const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
            if (res.status === 200) {
                dispatch({ type: DELETE_ITEM, items: await res.json() });
            }
        } catch (err) {}
    },
};
