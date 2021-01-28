import React from 'react';
import { Route, Redirect } from 'react-router-dom';


class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isManager = localStorage.getItem("isManager");
        return (
            isManager ?
                <Component />
                :
                <Redirect to={
                    {
                        pathname: '/unauthorized'
                    }
                } />
        )
    }

}
export default ProtectedRoute;

/*****function component***/
// const ProtectedRoute = ({ component: Component, isManager, ...rest }) => {

//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 true ?
//                     <Component {...rest} {...props} />
//                     :
//                     <Redirect to={
//                         {
//                             pathname: '/unauthorized',
//                             state: {
//                                 from: props.location
//                             }
//                         }
//                     } />
//             }} />
//     )
// }