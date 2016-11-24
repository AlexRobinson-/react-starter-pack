import React, { Component } from 'react';
import { Match, Link } from 'react-router';
import TodosPage from './../todos-page';

const App = () => (
  <div>
    <h1>Alexs React Starter Pack</h1>
    <Link to='/home'>Home</Link>
    <Link to='/todos'>Todos</Link>
    <Match pattern="/todos" component={TodosPage}/>
  </div>
);

export default App;
