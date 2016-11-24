import React, { Component } from 'react';
import { Match, Link } from 'react-router';
import TodosPage from './../todos-page';

class App extends Component {
  render () {
    return (
      <div>
        <h1>Alex's React Starter Pack</h1>
        <Link to='/home'>Home</Link>
        <Link to='/todos'>Todos</Link>
        <Match pattern="/todos" component={TodosPage}/>
      </div>
    )
  }
}

export default App;
