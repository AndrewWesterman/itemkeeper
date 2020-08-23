import { alerts, AlertState } from '../alerts';
import { SET_ALERT, CLEAR_ALERT } from '../../actions/types';
import { Alert } from '../../models/Alert';

describe('alerts reducer', () => {
    it('should handle SET_ALERT', () => {
        const testAlert = new Alert('test', 'success', '1');
        expect(
            alerts({ alerts: [] } as AlertState, {
                type: SET_ALERT,
                alert: testAlert,
            })
        ).toStrictEqual({
            alerts: [testAlert],
        } as AlertState);
    });

    it('should handle CLEAR_ALERT', () => {
        const testAlert = new Alert('test', 'success', '1');
        expect(
            alerts({ alerts: [testAlert] } as AlertState, {
                type: CLEAR_ALERT,
                id: testAlert.id,
            })
        ).toStrictEqual({
            alerts: [],
        } as AlertState);
    });
});
