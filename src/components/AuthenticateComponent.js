import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { getJWT } from '../helpers/jwt'

class AuthenticateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    triggerRedirect = () => {
        this.setState({ redirect: true})
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/users/login" />
        }
    }

    componentDidMount() {
        const jwt = getJWT();
        if (!jwt) {
            this.props.updateJwt({ jwt: false});
            this.triggerRedirect();

        } else {
            console.log('got here')
            fetch('http://localhost:5000/users/findUser', { headers: { Authorization: `Bearer ${jwt}`}})
            .then(res => {
                res.json().then(user => this.props.updateUser({user: user.userId}))
            })
            .then(() => {
                this.props.updateLists();
            })
            .catch(err => {
                localStorage.removeItem('JWT');
                this.props.updateJwt({ jwt: false})
            })
        }
        this.setState({ userConfirmed: true });
        
    }

    render() {
        if (!this.props.jwt) {
            return (
                <div>
                    {this.renderRedirect()}
                    <h1>Loading...</h1>
                </div>
            )
        }   

        return (
            <div>
                {this.renderRedirect()}
                {this.props.children}
            </div>
        )
    }
}

export default AuthenticateComponent;