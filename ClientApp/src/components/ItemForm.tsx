import { ItemState } from '../reducers/items';
import { actions } from '../actions/items';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Item } from '../models/Item';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';

type ItemFormProps = ItemState &
    typeof actions & { history: History<LocationState> } & RouteComponentProps<{
        id: string;
    }>;

class ItemForm extends PureComponent<ItemFormProps> {
    id = this.props.match.params.id;
    state: Item;

    constructor(props: any) {
        super(props);
        this.state = new Item('', 0);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount() {
        // Init our form state to the item belonging to :id
        if (this.id) {
            this.props.getItem(+this.id, () => {
                // callback to update state once we get the item
                this.setState({ ...this.props.item });
            });
        }
    }

    private handleChange(e: any) {
        this.setState({ [e.target.name]: e.target.value });
    }

    private handleSubmit(e: any) {
        const stateToItem = (state: any): Item => {
            return {
                ...state,
                cost: +state.cost, // some nonsense to prevent cost being converted to a string
            };
        };

        e.preventDefault();
        if (this.id === undefined) {
            this.props.createItem(stateToItem(this.state));
            this.props.history.push('/');
        } else {
            this.props.updateItem(+this.id, stateToItem(this.state));
            this.props.history.push('/');
        }
    }

    public render() {
        const { name, cost } = this.state as Item;
        return (
            <Fragment>
                <h1 className='text-primary'>
                    {this.id === undefined
                        ? 'Create Item'
                        : `Edit Entry ${this.id}`}
                </h1>
                <form className='form' onSubmit={this.handleSubmit}>
                    <div className='form-group m-2'>
                        <label htmlFor='nameField'>Name</label>
                        <input
                            id='nameField'
                            className='form-control'
                            type='text'
                            placeholder='Item name here...'
                            name='name'
                            value={name}
                            maxLength={50}
                            onChange={this.handleChange}
                            required
                        />
                        <small className='form-text text-muted ml-1'>
                            Name cannot be longer than 50 characters
                        </small>
                    </div>
                    <div className='form-group m-2'>
                        <label htmlFor='costField'>Cost</label>
                        <div className='input-group'>
                            <div className='input-group-prepend'>
                                <div className='input-group-text'>$</div>
                            </div>
                            <input
                                id='costField'
                                className='form-control'
                                type='number'
                                min={0}
                                name='cost'
                                value={cost}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='float-right m-1'>
                        <button
                            className='btn btn-light m-1'
                            onClick={() => {
                                this.props.history.push('/');
                            }}
                        >
                            Back
                        </button>
                        <button className='btn btn-primary m-1' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.items,
    actions
)(ItemForm as any);
