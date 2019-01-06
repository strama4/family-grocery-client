import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Lists from './pages/Lists';
import ListView from './components/ListView';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AuthenticateComponent from './components/AuthenticateComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: ""
    }
  }

  callAPI() {
    fetch('http://family-grocery-api.herokuapp.com/lists')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
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
        </main>

        <Route exact path="/" component={Landing} />
        <AuthenticateComponent>
          <Route exact path="/lists" render={() => <Lists lists={lists} />} />
        </AuthenticateComponent>
        <Route path="/lists/:id" render={(props) => <ListView lists={lists} {...props}/>} />
        <Route path="/users/register" component={SignUp} />
        <Route path="/users/login" component={SignIn} />
      </div>
    );
  }
}

export default App;
