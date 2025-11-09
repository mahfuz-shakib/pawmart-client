import React from 'react';

const Container = ({children}) => {
    return (
        <div className='container mx-auto px-3 max-w-7xl border'>
            {children}
        </div>
    );
};

export default Container;