import React from 'react';

import SearchMaxCost from '../SearchMaxCost';
import { Item } from '../../models/Item';
import { render, storeFake } from './test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ItemState } from '../../reducers/items';
import { actions } from '../../actions/items';
import '@testing-library/jest-dom';
import { AppThunkAction } from '../../store';
import { KnownAction } from '../../actions/alerts';
import { execPath } from 'process';

const initialItemState: ItemState = {
    item: undefined,
    items: [],
    maxItemCosts: [],
    maxCostItem: undefined,
    lastSearchedName: undefined,
    isLoading: true,
};
describe('<SearchMaxCost />', () => {
    test('render', () => {
        render(<SearchMaxCost />, { initialState: {} });
    });

    it('should display max cost item when there is a maxCostItem', () => {
        const testMax1 = new Item('Item 1', 300);

        const initialState = {
            items: {
                ...initialItemState,
                maxCostItem: testMax1,
            },
        };

        render(<SearchMaxCost />, { initialState });

        expect(screen.getByTestId(testMax1.name)).toBeInTheDocument();
    });

    it('should display nothing before search executed', () => {
        const initialState = {
            items: initialItemState,
        };

        render(<SearchMaxCost />, { initialState });
        // verify element not displayed by default
        expect(screen.queryByTestId('item-not-found-message')).toBeNull;
    });

    it('should display item not found message if search returned no item', () => {
        const testName = 'test';
        const initialState = {
            items: {
                ...initialItemState,
                maxCostItem: undefined,
                lastSearchedName: testName,
            },
        };

        // Verify element is shown with the text we want
        render(<SearchMaxCost />, { initialState });
        const notFound = screen.getByTestId('item-not-found-message');
        expect(notFound).toBeInTheDocument();
        expect(notFound.textContent?.includes(testName)).toBeTruthy();
    });
});
