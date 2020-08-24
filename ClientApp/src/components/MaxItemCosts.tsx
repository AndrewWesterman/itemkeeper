import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ItemState } from '../reducers/items';
import { actions } from '../actions/items';
import { ApplicationState } from '../store';
import { Item } from '../models/Item';
import { Spinner } from './Spinner';

type ItemsProps = ItemState & typeof actions;

class MaxItemCosts extends PureComponent<ItemsProps> {
    public componentDidMount() {
        this.props.getMaxItemCosts();
    }

    public render() {
        const { maxItemCosts, isLoading } = this.props;
        return (
            <div>
                <h1 className='text-primary'>Max Item Costs</h1>
                <p className='d-inline-block'>
                    Below is a list of each unique item in the system, along
                    with the maximum cost of the item
                </p>
                {isLoading ? (
                    <Spinner />
                ) : (
                    [
                        maxItemCosts === undefined ||
                        maxItemCosts.length === 0 ? (
                            <h3
                                key='no-items-message'
                                data-testid='no-items-message'
                            >
                                No items in the system, go add some!
                            </h3>
                        ) : (
                            <table
                                key='max-items-table'
                                className='table table-striped'
                            >
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maxItemCosts.map((item: Item) => (
                                        <tr
                                            key={item.name}
                                            data-testid={item.name}
                                        >
                                            <td>{item.name}</td>
                                            <td>${item.cost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ),
                    ]
                )}
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.items }),
    actions
)(MaxItemCosts as any);
