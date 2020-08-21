import { Action, Reducer } from 'redux';
import { Alert } from '../models/Alert';
import {
    KnownAction,
    SetAlertAction,
    ClearAlertAction,
} from '../actions/alerts';
import { SET_ALERT, CLEAR_ALERT } from '../actions/types';

export interface AlertState {
    alerts: Alert[];
}

const initialState: AlertState = {
    alerts: [],
};

export const alerts: Reducer<AlertState> = (
    state: AlertState | undefined,
    incomingAction: Action
): AlertState => {
    if (!state) state = initialState;

    const { type } = incomingAction as KnownAction;
    switch (type) {
        case SET_ALERT:
            const { alert } = incomingAction as SetAlertAction;
            return { ...state, alerts: state.alerts.concat(alert) };
        case CLEAR_ALERT:
            const { id } = incomingAction as ClearAlertAction;
            return {
                ...state,
                alerts: state.alerts.filter((alert) => alert.id !== id),
            };
        default:
            return state;
    }
};
