import { AppThunkAction } from '../store';
import { v4 as uuid } from 'uuid';
import { SET_ALERT, CLEAR_ALERT } from './types';
import { Alert } from '../models/Alert';

// Alert type constants
export const SUCCESS: string = 'success';
export const DANGER: string = 'danger';
export const INFO: string = 'info';
export const WARNING: string = 'warning';

export interface SetAlertAction {
    type: String;
    alert: Alert;
}

export interface ClearAlertAction {
    type: String;
    id: string;
}

export type KnownAction = SetAlertAction | ClearAlertAction;

export const actions = {
    setAlert: (
        alertType: string,
        message: string,
        timeout = 5000
    ): AppThunkAction<KnownAction> => async (dispatch) => {
        const id = uuid();
        dispatch({ type: SET_ALERT, alert: new Alert(id, message, alertType) });
        setTimeout(() => dispatch({ type: CLEAR_ALERT, id }), timeout);
    },
};
