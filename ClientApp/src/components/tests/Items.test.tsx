import React from 'react';

import Items from '../Items';
import { Item } from '../../models/Item';
import { render } from './test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ItemState } from '../../reducers/items';
import '@testing-library/jest-dom';
import { actions } from '../../actions/items';

const initialItemState: ItemState = {
    item: undefined,
    items: [],
    maxItemCosts: [],
    maxCostItem: undefined,
    lastSearchedName: undefined,
    isLoading: false,
};

describe('<Items />', () => {
    test('render', () => {
        render(<Items />, { initialState: {} });
    });

    it('should show no items message if items[] is empty', () => {
        const initialState = {
            items: {
                ...initialItemState,
            },
        };

        render(<Items />, { initialState });

        expect(screen.getByTestId('no-items-message')).toBeInTheDocument();
    });

    it('should render all items in items[]', () => {
        const testItems = [
            new Item('Item 1', 300, 1),
            new Item('Item 1', 300, 2),
            new Item('Item 2', 300, 3),
        ];

        const initialState = {
            items: {
                ...initialItemState,
                items: testItems,
            },
        };

        render(<Items />, { initialState });
        testItems.forEach((item) => {
            const itemEntry = screen.getByTestId(`entry-${item.id}`);
            // Verify the row exists
            expect(itemEntry).toBeInTheDocument();
            // Check each col has the proper data
            expect(itemEntry.children[0].textContent).toBe(item.id?.toString());
            expect(itemEntry.children[1].textContent).toBe(item.name);
            expect(itemEntry.children[2].textContent).toBe(`$${item.cost}`);
        });
    });

    it('should redirect on Add Item click', () => {
        const mockHistoryPush = jest.fn();
        const initialState = { items: { ...initialItemState } };
        const props = { history: { push: mockHistoryPush } };

        render(<Items {...props} />, { initialState });
        fireEvent.click(screen.getByTestId('add-item-button'));
        expect(mockHistoryPush).toHaveBeenCalledWith('/add-item');
    });

    it('should redirect to /edit-item/:id on Edit click', () => {
        const mockHistoryPush = jest.fn();
        const testItem = new Item('Item 1', 300, 1);
        const initialState = {
            items: { ...initialItemState, items: [testItem] },
        };
        const props = { history: { push: mockHistoryPush } };

        render(<Items {...props} />, { initialState });
        fireEvent.click(screen.getByTestId(`entry${testItem.id}-edit`));
        expect(mockHistoryPush).toHaveBeenCalledWith(
            `/edit-item/${testItem.id}`
        );
    });

    it('should call delete action with item id on Delete click', () => {
        const testItem = new Item('Item 1', 300, 1);

        const initialState = {
            items: {
                ...initialItemState,
                items: [testItem],
            },
        };

        const deleteSpy = jest.spyOn(actions, 'deleteItem');
        render(<Items />, { initialState });
        fireEvent.click(screen.getByTestId(`entry${testItem.id}-delete`));
        expect(deleteSpy).toHaveBeenCalledWith(testItem.id);
    });
});
