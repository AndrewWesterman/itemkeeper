import {
    GET_ITEMS,
    DELETE_ITEM,
    GET_ITEM,
    CREATE_ITEM,
    UPDATE_ITEM,
    GET_MAX_ITEM_COSTS,
    GET_MAX_COST_ITEM,
    CLEAR_MAX_COST_ITEM,
    LOADING_DATA,
    STOP_LOADING_DATA,
} from '../actions/types';
import {
    KnownAction,
    GetItemsAction,
    GetItemAction,
    GetMaxItemsAction,
    GetMaxCostItemAction,
} from '../actions/items';
import { Item } from '../models/Item';
import { Action, Reducer } from 'redux';

export interface ItemState {
    item?: Item;
    items: Item[];
    maxItemCosts: Item[];
    maxCostItem?: Item;
    lastSearchedName?: string;
    isLoading: boolean;
}

const initialState: ItemState = {
    item: undefined,
    items: [],
    maxItemCosts: [],
    maxCostItem: undefined,
    lastSearchedName: undefined,
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
        case GET_MAX_ITEM_COSTS:
            const { maxItemCosts } = incomingAction as GetMaxItemsAction;
            return { ...state, maxItemCosts, isLoading: false };
        case GET_MAX_COST_ITEM:
            const {
                maxCostItem,
                nameSearched,
            } = incomingAction as GetMaxCostItemAction;
            return {
                ...state,
                maxCostItem,
                lastSearchedName: nameSearched,
                isLoading: false,
            };
        case CLEAR_MAX_COST_ITEM:
            return { ...state, maxCostItem: undefined };
        case LOADING_DATA:
            return { ...state, isLoading: true };
        case STOP_LOADING_DATA:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};
