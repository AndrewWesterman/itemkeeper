import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ItemState } from '../reducers/items';
import { actions } from '../actions/items';
import { ApplicationState } from '../store';
import { Item } from '../models/Item';
import { History, LocationState } from 'history';

type ItemsProps = ItemState &
    typeof actions & { history: History<LocationState> };

class MaxItemCosts extends PureComponent<ItemsProps> {
    public componentDidMount() {
        this.props.getMaxItemCosts();
    }

    public render() {
        const { maxItemCosts, history } = this.props;
        return (
            <div>
                <h1 className='text-primary'>Max Items Costs</h1>
                <p className='float-left'>
                    Below is a list of each unique item in the system, along
                    with the maximum cost of the item
                </p>
                <table className='table table-striped'>
                    <tr>
                        <th>Item Name</th>
                        <th>Cost</th>
                    </tr>
                    <tbody>
                        {maxItemCosts.map((item: Item) => (
                            <tr key={`${item.name}:${item.cost}`}>
                                <td>{item.name}</td>
                                <td>${item.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.items,
    actions
)(MaxItemCosts as any);
