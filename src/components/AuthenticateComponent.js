import React from 'react';
import { getJWT } from '../helpers/jwt'

class AuthenticateComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const jwt = getJWT();
        if (!jwt) {
            console.log('redirect to login')
        }

        fetch('http://localhost:5000/users/findUser', { headers: { Authorization: `Bearer ${jwt}`}})
        .then(res => {
            console.log('we got here')
            res.json().then(user => this.setState({user: user.email}))
        })
        .catch(err => {
            localStorage.removeItem('JWT');
            console.log('whatevs')
        })
    }

    render() {
        if (this.state.user === undefined) {
            return <div><h1>Loading...</h1></div>
        }

        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default AuthenticateComponent;