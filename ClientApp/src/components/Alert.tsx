import React, { PureComponent, Fragment } from 'react';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { actions } from '../actions/alerts';
import { AlertState } from '../reducers/alerts';

type AlertProps = AlertState & typeof actions;

class Alert extends PureComponent<AlertProps> {
    public render() {
        const { alerts } = this.props;
        return (
            <Fragment>
                {alerts !== undefined &&
                    alerts.length > 0 &&
                    alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`alert alert-${alert.alertType}`}
                        >
                            {alert.message}
                        </div>
                    ))}
            </Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.alerts }),
    actions
)(Alert as any);
