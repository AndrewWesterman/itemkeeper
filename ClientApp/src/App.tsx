import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import Layout from './components/Layout';

import './app.css';
import Items from './components/Items';
import ItemForm from './components/ItemForm';

export default () => (
    <Layout>
        <Route exact path='/' component={Items} />
        <Route exact path='/items' component={Items} />

        <Route exact path='/add-item' component={ItemForm} />
        <Route exact path='/edit-item/:id' component={ItemForm} />
    </Layout>
);
