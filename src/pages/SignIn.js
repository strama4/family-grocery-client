import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
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
            user.json().then(result => localStorage.setItem('JWT', result.token))
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return(
            <div>
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

export default SignIn;