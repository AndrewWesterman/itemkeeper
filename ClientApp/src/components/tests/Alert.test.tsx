import React from 'react';

import Alert from '../Alert';
import { Alert as AlertModel } from '../../models/Alert';
import { render } from './test-utils';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

/*
Alerts is pretty dumb, so all we can test is the initial render
and the display of alerts passed in from state
*/
describe('<Alert />', () => {
    test('render', () => {
        render(<Alert />, { initialState: { alerts: [] } });
    });

    it('should display alerts', () => {
        const testAlert = new AlertModel('1', 'Test message', 'success');
        const testAlert2 = new AlertModel('2', 'Test message', 'success');
        render(<Alert />, {
            initialState: { alerts: { alerts: [testAlert, testAlert2] } },
        });

        expect(screen.getByTestId(testAlert.id)).toBeInTheDocument();
        expect(screen.getByTestId(testAlert2.id)).toBeInTheDocument();
    });
});
