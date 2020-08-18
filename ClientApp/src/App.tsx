import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';

import './app.css';
import Items from './components/Items';

export default () => (
    <Layout>
        <Route exact path='/' component={Items} />
        <Route exact path='/items' component={Items} />
    </Layout>
);
