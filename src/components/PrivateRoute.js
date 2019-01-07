import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ render: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => 
                props.user ? (
                    <div>
                        <Component {...props} />
                        {console.log('The user prop is: ', this.props)}
                    </div>
                ) : (
                    <div>
                        {console.log('The user prop is: ', props)}
                        <Redirect
                            to={{
                                pathname: "/users/login",
                                state: { from: props.location }
                            }}
                        />
                    </div>
                )
            }
        />
    )
}

export default PrivateRoute;