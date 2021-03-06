import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { loginUser } from '../apiAdapter';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }
    
    triggerRedirect = () => {
        this.setState({ redirect: true })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        loginUser({
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(user => {
            user.json().then(result => {
                localStorage.setItem('JWT', result.token)
                this.props.updateUser({user: result.userId})
                this.props.updateJwt({ jwt: true})
                this.triggerRedirect();
            }
        )})
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return(
            <div>
                {this.renderRedirect()}
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input className="w3-input w3-section" type="email" name="email" onChange={this.handleInputChange} placeholder="Enter email"></input>
                    <label htmlFor="password">Password:</label>
                    <input className="w3-input w3-section" type="password" name="password" onChange={this.handleInputChange} placeholder="Enter password"></input>
                    <button className="w3-button w3-teal" type="submit">Log In</button>
                </form>
            </div>

        )
    }
}

export default withRouter(SignIn);