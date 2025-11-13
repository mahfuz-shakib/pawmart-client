import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../component/Loader';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
        // console.log(user);
        const location = useLocation();
        if(loading) return <Loader></Loader>
        if(!user)
        {
            return <Navigate to='/login' state={location.pathname} replace/>
        }
        return children;
};

export default PrivateRoute;