import { actions, KnownAction } from '../alerts';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Alert } from '../../models/Alert';
import { SET_ALERT, CLEAR_ALERT } from '../types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('alertActions', () => {
    it('should should dispatch SET__ALERT action when setAlert is called then clear after set timeout', async () => {
        const { setAlert } = actions;
        const store = mockStore();
        jest.useFakeTimers();

        const testAlert = new Alert('', 'test', 'success');
        const timeout = 2000;
        store.dispatch(
            setAlert(testAlert.alertType, testAlert.message, timeout) as any
        );
        expect(
            store
                .getActions()
                .find((action: KnownAction) => action.type === SET_ALERT)?.alert
                .message
        ).toEqual(testAlert.message);
        jest.advanceTimersByTime(timeout);
        expect(
            store
                .getActions()
                .find((action: KnownAction) => action.type === CLEAR_ALERT)
        ).toBeDefined();
    });
});
