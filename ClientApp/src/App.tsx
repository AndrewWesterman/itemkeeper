import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';

import './app.css';

export default () => (
    <Layout>
        <Route exact path='/' />
    </Layout>
);
