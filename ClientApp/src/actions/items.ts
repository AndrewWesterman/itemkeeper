import { Item } from '../models/Item';
import { AppThunkAction } from '../store';

import {
    GET_ITEMS,
    DELETE_ITEM,
    GET_ITEM,
    CREATE_ITEM,
    UPDATE_ITEM,
    GET_MAX_ITEM_COSTS,
    GET_MAX_COST_ITEM,
    CLEAR_MAX_COST_ITEM,
} from './types';

export interface GetItemsAction {
    type: String;
    items: Item[];
}

export interface GetItemAction {
    type: String;
    item: Item;
}

export interface GetMaxItemsAction {
    type: String;
    maxItemCosts: Item[];
}

export interface GetMaxCostItemAction {
    type: String;
    maxCostItem: Item;
}

export interface NoPayloadAction {
    type: String;
}

export type KnownAction =
    | GetItemsAction
    | GetItemAction
    | GetMaxItemsAction
    | GetMaxCostItemAction
    | NoPayloadAction;

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

    // Get item by id
    getItem: (id: number): AppThunkAction<KnownAction> => async (dispatch) => {
        try {
            const item: Item = await fetch(`/api/items/${id}`).then((res) =>
                res.json()
            );
            dispatch({ type: GET_ITEM, item });
        } catch (err) {}
    },

    // Gets all unique items and their max cost
    getMaxItemCosts: (): AppThunkAction<KnownAction> => async (dispatch) => {
        try {
            const maxItemCosts: Item[] = await fetch(
                '/api/items/maxPrices'
            ).then((res) => res.json());
            dispatch({ type: GET_MAX_ITEM_COSTS, maxItemCosts });
        } catch (err) {}
    },

    // Gets max cost item
    getMaxCostItem: (name: string): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        try {
            dispatch({ type: CLEAR_MAX_COST_ITEM });
            const maxCostItem: Item = await fetch(
                `/api/items/${name}/maxPrice`
            ).then((res) => res.json());
            dispatch({ type: GET_MAX_COST_ITEM, maxCostItem });
        } catch (err) {}
    },

    // Create the item
    createItem: (item: Item): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        try {
            const res = await fetch('/api/items/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (res.ok) {
                const items: Item[] = await fetch('/api/items').then((res) =>
                    res.json()
                );
                dispatch({ type: CREATE_ITEM, items });
            }
        } catch (err) {}
    },

    // Update the item
    updateItem: (id: number, item: Item): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        try {
            const res = await fetch(`/api/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (res.ok) {
                const items: Item[] = await fetch('/api/items').then((res) =>
                    res.json()
                );
                dispatch({ type: UPDATE_ITEM, items });
            }
        } catch (err) {}
    },

    // Get the items from server
    deleteItem: (id?: number): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        if (!id) return;

        try {
            const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
            if (res.ok) {
                dispatch({ type: DELETE_ITEM, items: await res.json() });
            }
        } catch (err) {}
    },
};
