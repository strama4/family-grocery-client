import React from 'react';
import { Redirect } from 'react-router'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRedirect = () => {
        this.setState({ 
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords must match');
            this.setState({
                password: '',
                confirmPassword: ''
            })
        } else if (this.state.email.trim() === '') {
            alert('You must provide an email address');
            this.setState({
                email: ''
            });
        } else {
            fetch('http://family-grocery-api.herokuapp.com/users/register', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }),
            })
            .then(result => {
                if (result.status === 200) {
                    this.handleRedirect();
                }
                if (result.status === 500) {
                    result.json().then(res => res.map(item => alert(item.message)))
                }
            })
            .catch(err => {
                console.log('Client side', err);
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" placeholder="Enter an email" value={this.state.email} onChange={this.handleInputChange}></input>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" placeholder="Enter an password" value={this.state.password} onChange={this.handleInputChange}></input>
                    <label htmlFor="confirmPassword">Password: </label>
                    <input type="password" name="confirmPassword" placeholder="Enter an password" value={this.state.confirmPassword} onChange={this.handleInputChange}></input>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }

}

export default SignUp;