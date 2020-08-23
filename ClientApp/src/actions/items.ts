import { Item } from '../models/Item';
import { actions as alertActions, SUCCESS, DANGER } from './alerts';
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
    nameSearched: string;
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

const { setAlert } = alertActions;

const userFriendlyGenericError = (dispatch: any) => {
    dispatch(setAlert(DANGER, 'Something went wrong :(') as any);
};

export const actions = {
    // Get the items from server
    getItems: (): AppThunkAction<KnownAction> => async (dispatch) => {
        try {
            const items: Item[] = await fetch('/api/items').then((res) =>
                res.json()
            );
            dispatch({ type: GET_ITEMS, items });
        } catch (err) {
            userFriendlyGenericError(dispatch);
        }
    },

    // Get item by id
    getItem: (id: number): AppThunkAction<KnownAction> => async (dispatch) => {
        try {
            const item: Item = await fetch(`/api/items/${id}`).then((res) =>
                res.json()
            );
            dispatch({ type: GET_ITEM, item });
        } catch (err) {
            userFriendlyGenericError(dispatch);
        }
    },

    // Gets all unique items and their max cost
    getMaxItemCosts: (): AppThunkAction<KnownAction> => async (dispatch) => {
        try {
            const maxItemCosts: Item[] = await fetch(
                '/api/items/maxPrices'
            ).then((res) => res.json());
            dispatch({ type: GET_MAX_ITEM_COSTS, maxItemCosts });
        } catch (err) {
            userFriendlyGenericError(dispatch);
        }
    },

    // Gets max cost item
    getMaxCostItem: (name: string): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        try {
            dispatch({ type: CLEAR_MAX_COST_ITEM });
            const res = await fetch(`/api/items/${name}/maxPrice`);
            if (res.ok) {
                dispatch({
                    type: GET_MAX_COST_ITEM,
                    maxCostItem: await res.json(),
                });
            } else {
                dispatch({
                    type: GET_MAX_COST_ITEM,
                    maxCostItem: undefined,
                    nameSearched: name,
                });
            }
        } catch (err) {
            console.log(err);
            userFriendlyGenericError(dispatch);
        }
    },

    // Create the item
    createItem: (item: Item): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        const createItemGenericError = () =>
            dispatch(
                setAlert(
                    DANGER,
                    'Error creating the item, please try again'
                ) as any
            );

        try {
            const res = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (res.ok) {
                const items: Item[] = await fetch('/api/items').then((res) =>
                    res.json()
                );
                dispatch({ type: CREATE_ITEM, items });
                dispatch(setAlert(SUCCESS, 'Item created!') as any);
            } else {
                createItemGenericError();
            }
        } catch (err) {
            createItemGenericError();
        }
    },

    // Update the item
    updateItem: (id: number, item: Item): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        const updateItemGenericError = () =>
            dispatch(
                setAlert(
                    DANGER,
                    'Error updating the item, please try again.'
                ) as any
            );

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
                dispatch(setAlert(SUCCESS, 'Item updated!') as any);
            } else {
                updateItemGenericError();
            }
        } catch (err) {
            updateItemGenericError();
        }
    },

    // Get the items from server
    deleteItem: (id: number): AppThunkAction<KnownAction> => async (
        dispatch
    ) => {
        const deleteItemGenericError = () =>
            dispatch(
                setAlert(
                    DANGER,
                    'Error deleting the item, please try again'
                ) as any
            );

        try {
            const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
            if (res.ok) {
                dispatch({ type: DELETE_ITEM, items: await res.json() });
                dispatch(setAlert(SUCCESS, 'Item deleted!') as any);
            } else {
                deleteItemGenericError();
            }
        } catch (err) {
            deleteItemGenericError();
        }
    },
};
