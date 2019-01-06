import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Lists from './pages/Lists';
import ListView from './components/ListView';
import SignUp from './pages/SignUp';

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
          <Link to="/users/signup">Sign Up</Link>
          <Link to="/lists">Lists</Link>
        </main>

        <Route exact path="/" component={Landing} />
        <Route exact path="/lists" render={() => <Lists lists={lists} />} />
        <Route path="/lists/:id" render={(props) => <ListView lists={lists} {...props}/>} />
        <Route path="/users/signup" component={SignUp} />
      </div>
    );
  }
}

export default App;
