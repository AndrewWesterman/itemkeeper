import React from 'react';

import ItemForm from '../ItemForm';
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
const match = { match: { params: { id: 1 } } };

describe('<ItemForm />', () => {
    test('render', () => {
        render(<ItemForm {...match} />, { initialState: {} });
    });

    it('should init with item data if in edit mode (an item exists)', async () => {
        const testItem = new Item('Item 1', 300);
        testItem.id = 1;

        const initialState = {
            items: {
                ...initialItemState,
                item: testItem,
            },
        };

        render(<ItemForm {...match} />, { initialState });

        expect(screen.getByTestId('form-header').textContent).toBe(
            `Edit Entry ${testItem.id}`
        );
        expect(
            ((await screen.findByTestId('name-input')) as HTMLInputElement)
                .value
        ).toBe(testItem.name);
    });

    it('should be empty if not in edit mode', () => {
        const initialState = {
            items: {
                ...initialItemState,
                item: undefined,
            },
        };

        const noID = { match: { params: {} } };
        render(<ItemForm {...noID} />, { initialState });

        expect(screen.getByTestId('form-header').textContent).toBe(
            `Create Item`
        );
        expect(screen.getByTestId('name-input').textContent).toBe('');
    });
});
