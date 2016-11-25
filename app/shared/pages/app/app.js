import React, { Component } from 'react';
import { Match, Link } from 'react-router';
import TodoModule from './../../modules/todo';

const App = () => (
  <div>
    <h1>Alexs React Starter Pack</h1>
    <Link to='/home'>Home</Link>
    <Link to='/todos'>Todos</Link>
    <Match pattern="/todos" component={TodoModule}/>
  </div>
);

export default App;
