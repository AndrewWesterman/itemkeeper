import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ItemState } from '../reducers/items';
import { actions } from '../actions/items';
import { ApplicationState } from '../store';
import { Item } from '../models/Item';

type ItemsProps = ItemState & typeof actions;

class Items extends PureComponent<ItemsProps> {
    public componentDidMount() {
        this.props.getItems();
    }

    public render() {
        const { items } = this.props;
        return (
            <div>
                <h1 className='text-primary'>All Current Items</h1>
                <p>
                    Below is a list off all current items catalogued in the
                    system
                </p>
                <table className='table table-striped'>
                    <th>Id</th>
                    <th>Item Name</th>
                    <th>Cost</th>
                    <th></th>
                    <tbody>
                        {items.map((item: Item) => (
                            <tr key={`${item.name}:${item.cost}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>${item.cost}</td>
                                <td>
                                    <div className='float-right'>
                                        <button className='btn btn-info'>
                                            Edit
                                        </button>{' '}
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => {
                                                this.props.deleteItem(item.id);
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
