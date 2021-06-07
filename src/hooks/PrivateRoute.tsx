import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLogin } from '../store/gallerySlice';
import { useSelector } from 'react-redux';

const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {
    const isLogin = useSelector(getLogin);

    return isLogin ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to="/" />;
};
export default PrivateRoute;
