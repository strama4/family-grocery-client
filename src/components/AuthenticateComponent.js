import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { getJWT } from '../helpers/jwt'

class AuthenticateComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: undefined,
            jwt: true
        }
    }

    
    componentDidMount() {
        const jwt = getJWT();
        if (!jwt) {
            this.setState({ jwt: false})
        } else {
            fetch('http://localhost:5000/users/findUser', { headers: { Authorization: `Bearer ${jwt}`}})
            .then(res => {
                res.json().then(user => this.setState({user: user.id}))
            })
            .catch(err => {
                localStorage.removeItem('JWT');
                this.setState({ jwt: false})
            })
        }
        
    }

    render() {
        if (this.state.user === undefined && this.state.jwt) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }   
        
        if (!this.state.jwt) {
            return <Redirect to="/users/login" />
        }

        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default AuthenticateComponent;