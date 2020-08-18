import { Item } from '../models/Item';
import { AppThunkAction } from '../store';

import { GET_ITEMS } from './types';

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
};
