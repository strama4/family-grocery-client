import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

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
        fetch('http://localhost:5000/users/login', {
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
                    <input type="email" name="email" onChange={this.handleInputChange} placeholder="Enter email"></input>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={this.handleInputChange} placeholder="Enter password"></input>
                    <button type="submit">Log In</button>
                </form>
            </div>

        )
    }
}

export default withRouter(SignIn);