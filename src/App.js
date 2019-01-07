import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      user: undefined
    }
  }

  async callAPI() {
    const listData = await fetch('http://localhost:5000/lists')
                      .then(res => res.text())
                      .then(res => JSON.parse(res));

    const userData = listData.filter(list => list.userId === this.user)
  }

  signOut = () => {
    localStorage.removeItem('JWT');
    this.setState({ user: undefined }, () => console.log(this.state))
  }

  componentDidMount() {
    this.callAPI();

    
  }
  
  render() {
    const lists = this.state.apiResponse;

    return (
      <div className="App">
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
          <Route path="/users/login" component={SignIn} />
          <Route path="/users/register" component={SignUp} />
          <Route path="/users/logout" component={LogOut} />
          
          <AuthenticateComponent>
            <Route exact path="/lists" render={() => <Lists lists={lists} />} />
            <Route path="/lists/:id" render={(props) => <ListView lists={lists} {...props}/>} />
          </AuthenticateComponent>
          
          {/* <PrivateRoute path="/lists" render={(props) => <Lists user={this.state.user} lists={lists} {...props}/>} /> */}


        </Switch>
      </div>
    );
  }
}

export default App;
