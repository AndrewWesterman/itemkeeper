import { actions, KnownAction } from '../items';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Item } from '../../models/Item';
import {
    GET_ITEMS,
    GET_ITEM,
    GET_MAX_ITEM_COSTS,
    CLEAR_MAX_COST_ITEM,
    GET_MAX_COST_ITEM,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
} from '../types';
import fetchMock from 'fetch-mock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const mockFetchJsonResponse = (body: any) => ({
    body: body,
    headers: { 'content-type': 'application/json' },
});

describe('itemActions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('should dispatch GET_ITEMS action on getItems call', async () => {
        const { getItems } = actions;
        const store = mockStore();

        fetchMock.getOnce('/api/items', mockFetchJsonResponse([]));

        // call getItems
        await store.dispatch(getItems() as any);
        // expect GET_ITEMS to be in store
        expect(
            store
                .getActions()
                .find((action: KnownAction) => action.type === GET_ITEMS)
        ).toBeDefined();
    });

    it('should dispatch GET_ITEM action on getItem(id) call', async () => {
        const { getItem } = actions;
        const store = mockStore();

        const testItem = new Item('test', 12, 1);

        fetchMock.getOnce(
            `/api/items/${testItem.id}`,
            mockFetchJsonResponse(JSON.stringify(testItem))
        );
        // call getItem(id)
        await store.dispatch(getItem(testItem.id as number) as any);
        // expect GET_ITEM to be in store
        expect(
            store
                .getActions()
                .find((action: KnownAction) => action.type === GET_ITEM)
        ).toBeDefined();
    });

    it('should dispatch GET_MAX_ITEM_COSTS action on getMaxItemCosts call', async () => {
        const { getMaxItemCosts } = actions;
        const store = mockStore();

        fetchMock.getOnce('/api/items/maxPrices', mockFetchJsonResponse([]));

        // call getMaxItemCosts()
        await store.dispatch(getMaxItemCosts() as any);
        // expect GET_MAX_ITEM_COSTS to be in store
        expect(
            store
                .getActions()
                .find(
                    (action: KnownAction) => action.type === GET_MAX_ITEM_COSTS
                )
        ).toBeDefined();
    });

    it('should dispatch CLEAR_MAX_COST_ITEM and GET_MAX_COST_ITEM action on getMaxCostItem call', async () => {
        const { getMaxCostItem } = actions;
        const store = mockStore();

        const testMaxPriceItem = new Item('maxItem', 350);

        fetchMock.getOnce(
            `/api/items/${testMaxPriceItem.name}/maxPrice`,
            mockFetchJsonResponse(JSON.stringify(testMaxPriceItem))
        );

        // call getMaxCostItem()
        await store.dispatch(getMaxCostItem(testMaxPriceItem.name) as any);
        // expect CLEAR_MAX_COST_ITEM and GET_MAX_COST_ITEM to be in store
        expect(
            store
                .getActions()
                .find(
                    (action: KnownAction) => action.type === CLEAR_MAX_COST_ITEM
                )
        ).toBeDefined();
        expect(
            store
                .getActions()
                .find(
                    (action: KnownAction) => action.type === GET_MAX_COST_ITEM
                )
        ).toBeDefined();
    });

    it('should dispatch CREATE_ITEM action on createItem call', async () => {
        const { createItem } = actions;
        const store = mockStore();

        const testNewItem = new Item('newItem', 122);

        fetchMock
            .postOnce('/api/items', mockFetchJsonResponse({}))
            .getOnce('/api/items', mockFetchJsonResponse([testNewItem]));

        // call createItem()
        await store.dispatch(createItem(testNewItem) as any);
        // expect CREATE_ITEM to be in store
        expect(
            store
                .getActions()
                .find((action: KnownAction) => action.type === CREATE_ITEM)
        ).toBeDefined();
    });

    it('should dispatch UPDATE_ITEM action on updateItem call', async () => {
        const { updateItem } = actions;
        const store = mockStore();

        const testUpdateItem = new Item('updateItem', 122, 1);

        fetchMock
            .putOnce(
                `/api/items/${testUpdateItem.id}`,
                mockFetchJsonResponse({})
            )
            .getOnce('/api/items', mockFetchJsonResponse([testUpdateItem]));

        // call updateItem()
        await store.dispatch(
            updateItem(testUpdateItem.id as number, testUpdateItem) as any
        );
        // expect UPDATE_ITEM to be in store
        expect(
            store
                .getActions()
                .find((action: KnownAction) => action.type === UPDATE_ITEM)
        ).toBeDefined();
    });

    it('should dispatch DELETE_ITEM action on deleteItem call', async () => {
        const { deleteItem } = actions;
        const store = mockStore();

        const testDeleteItem = new Item('deleteItem', 122, 1);

        fetchMock.deleteOnce(
            `/api/items/${testDeleteItem.id}`,
            mockFetchJsonResponse([])
        );

        // call deleteItem()
        await store.dispatch(deleteItem(testDeleteItem.id as number) as any);
        // expect DELETE_ITEM to be in store
        expect(
            store
                .getActions()
                .find((action: KnownAction) => action.type === DELETE_ITEM)
        ).toBeDefined();
    });
});
