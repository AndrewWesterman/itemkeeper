import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

export const storeFake = (state: any) => ({
    default: () => {},
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({ ...state }),
});

export const render = (
    ui: ReactElement,
    {
        initialState,
        store = storeFake(initialState),
        ...renderOptions
    } = {} as any
) => {
    const Wrapper = ({ children }: any) => {
        return <Provider store={store}>{children}</Provider>;
    };
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
