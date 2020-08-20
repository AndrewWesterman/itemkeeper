import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ItemState } from '../reducers/items';
import { actions } from '../actions/items';
import { ApplicationState } from '../store';
import { Item } from '../models/Item';
import { History, LocationState } from 'history';

type ItemsProps = ItemState &
    typeof actions & { history: History<LocationState> };

class Items extends PureComponent<ItemsProps> {
    public componentDidMount() {
        this.props.getItems();
    }

    public render() {
        const { items, history } = this.props;
        return (
            <div>
                <h1 className='text-primary'>All Current Items</h1>
                <p className='float-left'>
                    Below is a list off all current items catalogued in the
                    system
                </p>
                <button
                    className='btn btn-primary float-right m-2'
                    onClick={() => history.push('/add-item')}
                >
                    + Add Item
                </button>
                <table className='table table-striped'>
                    <tr>
                        <th>Id</th>
                        <th>Item Name</th>
                        <th>Cost</th>
                        <th></th>
                    </tr>
                    <tbody>
                        {items.map((item: Item) => (
                            <tr key={`${item.name}:${item.cost}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>${item.cost}</td>
                                <td>
                                    <div className='float-right'>
                                        <button
                                            className='btn btn-info ml-1'
                                            onClick={() => {
                                                history.push(
                                                    `/edit-item/${item.id}`
                                                );
                                            }}
                                        >
                                            Edit
                                        </button>{' '}
                                        <button
                                            className='btn btn-danger ml-2'
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
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.items,
    actions
)(Items as any);
