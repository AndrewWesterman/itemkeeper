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

    public async componentDidMount() {
        // Init our form state to the item belonging to :id
        if (this.id) {
            // ESLint complains about this but some testing
            // makes it looks like this actually awaits the
            // inner async method Thunk maps to
            await this.props.getItem(+this.id);
            this.setState({ ...this.props.item });
        }
    }

    private handleChange(e: any) {
        this.setState({ [e.target.name]: e.target.value });
    }

    private handleSubmit(e: any) {
        e.preventDefault();
        const stateToItem = (state: Item): Item => {
            return {
                ...state,
                name: state.name.toString().trim(),
                cost: +state.cost, // some nonsense to prevent cost being converted to a string
            };
        };
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
                {/* Header */}
                <h1 className='text-primary' data-testid='form-header'>
                    {this.id === undefined
                        ? 'Create Item'
                        : `Edit Entry ${this.id}`}
                </h1>
                {/* Item Form */}
                <form className='form' onSubmit={this.handleSubmit}>
                    {/* Name input */}
                    <div className='form-group m-2'>
                        <label htmlFor='nameField'>Name</label>
                        <input
                            id='nameField'
                            data-testid='name-input'
                            className='form-control'
                            type='text'
                            placeholder='Item name here...'
                            name='name'
                            value={name}
                            maxLength={50}
                            pattern='^[a-zA-Z0-9\s]+$'
                            onChange={this.handleChange}
                            required
                        />
                        <small className='form-text text-muted ml-1'>
                            Name cannot be longer than 50 characters or contain
                            any special characters (spaces excluded).
                        </small>
                    </div>
                    {/* Cost input */}
                    <div className='form-group m-2'>
                        <label htmlFor='costField'>Cost</label>
                        <div className='input-group'>
                            <div className='input-group-prepend'>
                                <div className='input-group-text'>$</div>
                            </div>
                            <input
                                id='costField'
                                data-testid='cost-input'
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
                        {/* Back button */}
                        <button
                            className='btn btn-light m-1'
                            onClick={() => {
                                this.props.history.push('/');
                            }}
                        >
                            Back
                        </button>
                        {/* Submit button */}
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
    (state: ApplicationState) => ({ ...state.items }),
    actions
)(ItemForm as any);
