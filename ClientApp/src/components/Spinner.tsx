import React from 'react';

export const Spinner = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div
                className='spinner-border text-primary align-center'
                role='status'
            >
                <span className='sr-only'>Loading...</span>
            </div>
        </div>
    );
};
