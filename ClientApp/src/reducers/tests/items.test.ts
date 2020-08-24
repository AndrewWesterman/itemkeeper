import { items, ItemState } from '../items';
import {
    GET_ITEMS,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    GET_MAX_ITEM_COSTS,
    GET_MAX_COST_ITEM,
    GET_ITEM,
    CLEAR_MAX_COST_ITEM,
    LOADING_DATA,
    STOP_LOADING_DATA,
} from '../../actions/types';
import { Item } from '../../models/Item';
import {
    GetItemsAction,
    GetItemAction,
    GetMaxItemsAction,
    GetMaxCostItemAction,
    NoPayloadAction,
} from '../../actions/items';

const initialState: ItemState = {
    item: undefined,
    items: [],
    maxItemCosts: [],
    maxCostItem: undefined,
    lastSearchedName: undefined,
    isLoading: true,
};

describe('items reducer', () => {
    it('should handle invalid action input', () => {
        const initialState = { stateProp: 'some value' };
        expect(
            items(initialState as any, { type: 'Invalid Type' } as any)
        ).toStrictEqual(initialState);
    });

    it('should handle GET_ITEMS', () => {
        const testItem = new Item('test', 50);
        expect(
            items(initialState, {
                type: GET_ITEMS,
                items: [testItem],
            } as GetItemsAction)
        ).toStrictEqual({
            ...initialState,
            items: [testItem],
            isLoading: false,
        } as ItemState);
    });

    it('should handle CREATE_ITEM', () => {
        const testItem = new Item('test', 50);
        expect(
            items(initialState, {
                type: CREATE_ITEM,
                items: [testItem],
            } as GetItemsAction)
        ).toStrictEqual({
            ...initialState,
            items: [testItem],
            isLoading: false,
        } as ItemState);
    });

    it('should handle UPDATE_ITEM', () => {
        const testItem = new Item('test', 50);
        expect(
            items(initialState, {
                type: UPDATE_ITEM,
                items: [testItem],
            } as GetItemsAction)
        ).toStrictEqual({
            ...initialState,
            items: [testItem],
            isLoading: false,
        } as ItemState);
    });

    it('should handle DELETE_ITEM', () => {
        const testItem = new Item('test', 50);
        expect(
            items(initialState, {
                type: DELETE_ITEM,
                items: [testItem],
            } as GetItemsAction)
        ).toStrictEqual({
            ...initialState,
            items: [testItem],
            isLoading: false,
        } as ItemState);
    });

    it('should handle GET_ITEM', () => {
        const testItem = new Item('test', 50);
        expect(
            items(initialState, {
                type: GET_ITEM,
                item: testItem,
            } as GetItemAction)
        ).toStrictEqual({
            ...initialState,
            item: testItem,
            isLoading: false,
        } as ItemState);
    });

    it('should handle GET_MAX_ITEM_COSTS', () => {
        const testItem = new Item('test', 50);
        expect(
            items(initialState, {
                type: GET_MAX_ITEM_COSTS,
                maxItemCosts: [testItem],
            } as GetMaxItemsAction)
        ).toStrictEqual({
            ...initialState,
            maxItemCosts: [testItem],
            isLoading: false,
        } as ItemState);
    });

    it('should handle GET_MAX_COST_ITEM', () => {
        const testItem = new Item('test', 50);
        expect(
            items(initialState, {
                type: GET_MAX_COST_ITEM,
                maxCostItem: testItem,
                nameSearched: testItem.name,
            } as GetMaxCostItemAction)
        ).toStrictEqual({
            ...initialState,
            maxCostItem: testItem,
            lastSearchedName: testItem.name,
            isLoading: false,
        } as ItemState);
    });

    it('should handle CLEAR_MAX_COST_ITEM', () => {
        const testItem = new Item('test', 50);
        expect(
            items({ ...initialState, maxCostItem: testItem }, {
                type: CLEAR_MAX_COST_ITEM,
            } as NoPayloadAction)
        ).toStrictEqual({
            ...initialState,
            maxCostItem: undefined,
        });
    });

    it('should handle LOADING_DATA', () => {
        expect(
            items({ ...initialState, isLoading: false }, {
                type: LOADING_DATA,
            } as NoPayloadAction)
        ).toStrictEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('should handle STOP_LOADING_DATA', () => {
        expect(
            items({ ...initialState, isLoading: true }, {
                type: STOP_LOADING_DATA,
            } as NoPayloadAction)
        ).toStrictEqual({
            ...initialState,
            isLoading: false,
        });
    });
});
