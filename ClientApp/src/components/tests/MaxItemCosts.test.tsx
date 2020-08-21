import React from 'react';

import MaxItemCosts from '../MaxItemCosts';
import { Item as ItemModel, Item } from '../../models/Item';
import { render } from './test-utils';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ItemState } from '../../reducers/items';

const initialItemState: ItemState = {
    item: undefined,
    items: [],
    maxItemCosts: [],
    maxCostItem: undefined,
    isLoading: true,
};
describe('<MaxItemCosts />', () => {
    test('render', () => {
        render(<MaxItemCosts />, { initialState: {} });
    });

    it('should display max cost items when there are maxItemCosts', () => {
        const testMax1 = new Item('Item 1', 300);
        const testMax2 = new Item('Item 2', 300);

        const initialState = {
            items: {
                ...initialItemState,
                maxItemCosts: [testMax1, testMax2],
            },
        };

        render(<MaxItemCosts />, { initialState });

        expect(screen.getByTestId(testMax1.name)).toBeInTheDocument();
        expect(screen.getByTestId(testMax2.name)).toBeInTheDocument();
    });

    it('should display no items message when there are no maxItemCosts', () => {
        const initialState = {
            items: initialItemState,
        };

        render(<MaxItemCosts />, initialState);

        expect(screen.getByTestId('no-items-message')).toBeInTheDocument();
    });
});
