import React, { Component } from 'react';
import { Link, Route, Redirect, withRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import './App.css';
import Landing from './pages/Landing';
import Lists from './pages/Lists';
import ListView from './components/ListView';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import LogOut from './components/SignOut';
import AuthenticateComponent from './components/AuthenticateComponent';
import { getJWT } from './helpers/jwt';
const io = require('socket.io-client');
const socket = io.connect('http://localhost:5000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLists: "",
      user: null,
      jwt: true
    }
  }

  async callAPI() {
    const jwt = getJWT();
        if (!jwt) {
            this.setState({ jwt: false})
        } else {
            fetch('http://localhost:5000/users/findUser', { headers: { Authorization: `Bearer ${jwt}`}})
            .then(res => {
                res.json().then(user => {
                  this.setState({user: user.userId})
                  console.log('FIND USER', user)
                })
            })
            .then(() => {
              this.getUserLists();
            })
            .catch(err => {
                localStorage.removeItem('JWT');
                this.setState({ jwt: false})
            })
        }
  }

  signOut = () => {
    localStorage.removeItem('JWT');
    this.setState({ user: undefined, userLists: "" })
  }

  updateUser = (user) => {
    this.setState(user)
  }

  updateJwt = (jwt) => {
    this.setState({ jwt })
  }

  getUserLists = () => {
    fetch(`http://localhost:5000/lists/${this.state.user}`)
    .then(res => {
      res.json().then(data => {
        console.log('Lists found: ', data)
        this.setState({ userLists: data})
      })
    })
  }

  getUserListsWebSocket = () => {
    socket.on('updatedTasks', (data) => {

    })
  }
  async componentDidMount() {
    await this.callAPI();
  }
  
  render() {
    const { userLists, user, jwt } = this.state;

    return (
      <div className="App">
        {console.log('STATE', this.state)}
        <main className="container">
          {/* stick in a nav here */}
          <Link to="/">Home</Link>
          <Link to="/users/register">Sign Up</Link>
          <Link to="/users/login">Sign In</Link>
          <Link to="/lists">Lists</Link>
          <Link to="/users/logout" onClick={this.signOut}>Sign Out</Link>
        </main>

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/users/login" render={(props) => <SignIn getUserLists={this.getUserLists} updateUser={this.updateUser} updateJwt={this.updateJwt} {...props} />} />
          <Route path="/users/register" component={SignUp} />
          <Route path="/users/logout" component={LogOut} />
          
          <AuthenticateComponent user={user} jwt={jwt} updateUser={this.updateUser} updateJwt={this.updateJwt} updateLists={this.getUserLists}>
            <Route exact path="/lists" render={() => <Lists lists={userLists} />} />
            <Route path="/lists/:id" render={(props) => <ListView lists={userLists} {...props}/>} />
          </AuthenticateComponent>
        </Switch>
      </div>
    );
  }
}

export default App;
