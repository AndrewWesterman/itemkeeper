import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ItemState } from '../reducers/items';
import { actions } from '../actions/items';
import { ApplicationState } from '../store';
import { Item } from '../models/Item';
import { History, LocationState } from 'history';
import { Spinner } from './Spinner';

type ItemsProps = ItemState &
    typeof actions & { history: History<LocationState> };

class Items extends PureComponent<ItemsProps> {
    public async componentDidMount() {
        await this.props.getItems();
    }

    public render() {
        const { items, isLoading, history } = this.props;
        return (
            <div>
                <h1 className='text-primary'>All Current Items</h1>
                <div className=''>
                    <p className='d-inline-block'>
                        Below is a list of all current items catalogued in the
                        system
                    </p>
                    <button
                        data-testid='add-item-button'
                        className='btn btn-primary flex float-right m-2'
                        onClick={() => history.push('/add-item')}
                    >
                        + Add Item
                    </button>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    [
                        items === undefined || items.length === 0 ? (
                            <h3
                                key='no-items-message'
                                className='d-flex'
                                data-testid='no-items-message'
                            >
                                No items found, add some!
                            </h3>
                        ) : (
                            <table
                                key='items-table'
                                className='table table-striped'
                            >
                                <thead>
                                    <tr>
                                        <th className='d-none d-sm-table-cell'>
                                            Id
                                        </th>
                                        <th>Item Name</th>
                                        <th>Cost</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item: Item) => (
                                        <tr
                                            key={item.id}
                                            data-testid={`entry-${item.id}`}
                                        >
                                            <td className='d-none d-sm-table-cell'>
                                                {item.id}
                                            </td>
                                            <td>{item.name}</td>
                                            <td>${item.cost}</td>
                                            <td>
                                                <div className='float-right'>
                                                    <button
                                                        className='btn btn-info mr-2'
                                                        data-testid={`entry${item.id}-edit`}
                                                        onClick={() => {
                                                            history.push(
                                                                `/edit-item/${item.id}`
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </button>{' '}
                                                    <button
                                                        className='btn btn-danger mr-1'
                                                        data-testid={`entry${item.id}-delete`}
                                                        onClick={() => {
                                                            if (item.id)
                                                                this.props.deleteItem(
                                                                    item.id
                                                                );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
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
)(Items as any);
