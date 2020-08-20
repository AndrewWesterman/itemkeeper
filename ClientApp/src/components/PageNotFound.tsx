import React, { PureComponent } from 'react';
import './PageNotFound.css';

export class PageNotFound extends PureComponent {
    public render() {
        return (
            <div className='v-center'>
                <blockquote className='block-quote text-center'>
                    <h1>404</h1>
                    <h3>Page Not Found</h3>
                    <p>
                        The page you were looking for was not found, please try
                        a different url.
                    </p>
                </blockquote>
            </div>
        );
    }
}
