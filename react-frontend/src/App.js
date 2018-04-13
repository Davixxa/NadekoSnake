import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = { users: [] }
  

  //Code source: https://stackoverflow.com/questions/38510640/how-to-make-a-rest-post-call-from-reactjs-code
  //Form data: https://blog.stvmlbrn.com/2017/04/07/submitting-form-data-with-react.html 
  componentDidMount() {
    fetch('/users', { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;
