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
import {fetchUser} from './apiAdapter';

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
            fetchUser({ headers: { Authorization: `Bearer ${jwt}`}})
            .then(res => {
                res.json().then(user => {
                  this.setState({user: user.userId})
                })
            })
            // .then(() => {
            //   this.getUserLists();
            // })
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

  // getUserLists = () => {
  //   fetch(`http://localhost:5000/lists/`)
  //   .then(res => {
  //     res.json().then(data => {
  //       const userLists = data.filter(list => list.userId === this.state.user)
  //       this.setState({ userLists })
  //     })
  //   })
  // }

  async componentDidMount() {
    await this.callAPI();
  }
  
  render() {
    const { userLists, user, jwt } = this.state;

    return (
      <div className="w3-container">
        <main className="w3-teal w3-bar">
          {/* stick in a nav here */}
          <Link to="/" className="w3-bar-item">Home</Link>
          {
            !user &&
            <div>
              <Link to="/users/register" className="w3-bar-item">Sign Up</Link>
              <Link to="/users/login" className="w3-bar-item">Sign In</Link>
            </div>
          } 
          {
            user &&
            <div>
              <Link to="/lists" className="w3-bar-item">Lists</Link>
              <Link to="/users/logout" onClick={this.signOut} className="w3-bar-item">Sign Out</Link>

            </div>
          }
        </main>
        
        <div className="w3-padding-large w3-padding-32">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/users/login" render={(props) => <SignIn getUserLists={this.getUserLists} updateUser={this.updateUser} updateJwt={this.updateJwt} {...props} />} />
            <Route path="/users/register" component={SignUp} />
            <Route path="/users/logout" component={LogOut} />
            
            <AuthenticateComponent user={user} jwt={jwt} updateUser={this.updateUser} updateJwt={this.updateJwt} >
              <Route exact path="/lists" render={(props) => <Lists user={user} {...props}/>} />
              <Route path="/lists/:id" render={(props) => <ListView lists={userLists} {...props}/>} />
            </AuthenticateComponent>
          </Switch>

        </div>
      </div>
    );
  }
}

export default App;
