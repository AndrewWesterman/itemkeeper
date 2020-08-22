import { ItemState } from '../reducers/items';
import { actions } from '../actions/items';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

type ItemFormProps = ItemState & typeof actions;

interface SearchMaxCostState {
    name: string;
}

class SearchMaxCost extends PureComponent<ItemFormProps> {
    state: SearchMaxCostState;

    constructor(props: any) {
        super(props);
        this.state = { name: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(e: any) {
        this.setState({ name: e.target.value });
    }

    private async handleSubmit(e: any) {
        e.preventDefault();
        await this.props.getMaxCostItem(this.state.name);
    }

    public render() {
        const { name } = this.state as any;
        const { maxCostItem, lastSearchedName } = this.props;
        return (
            <Fragment>
                {/* Header */}
                <h1 className='text-primary'>Search For Max Item Cost</h1>
                <p>Return the max cost for the item with the provided name</p>
                {/* Item Form */}
                <form
                    className='form'
                    onSubmit={this.handleSubmit}
                    data-testid='name-search-form'
                >
                    <div className='form-group'>
                        {/* Name input */}
                        <div className='input-group m-1'>
                            <div className='input-group-prepend'>
                                <div className='input-group-text'>
                                    <svg
                                        width='1em'
                                        height='1em'
                                        viewBox='0 0 16 16'
                                        className='bi bi-search'
                                        fill='currentColor'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'
                                        />
                                        <path
                                            fillRule='evenodd'
                                            d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'
                                        />
                                    </svg>
                                </div>
                            </div>
                            <input
                                id='nameField'
                                className='form-control'
                                type='text'
                                placeholder='Search item name here...'
                                name='name'
                                value={name}
                                maxLength={50}
                                pattern='^[a-zA-Z0-9\s]+$'
                                onChange={this.handleChange}
                                required
                            />

                            {/* Search button */}
                            <div className='input-group-append'>
                                <button
                                    className='btn btn-primary'
                                    type='submit'
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                {maxCostItem && (
                    <h3 data-testid={maxCostItem.name}>
                        Max cost for {maxCostItem.name} is ${maxCostItem.cost}
                    </h3>
                )}
                {!maxCostItem && lastSearchedName && (
                    <h3 data-testid='item-not-found-message'>
                        Couldn't find '{lastSearchedName}'
                    </h3>
                )}
            </Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.items }),
    actions
)(SearchMaxCost as any);
