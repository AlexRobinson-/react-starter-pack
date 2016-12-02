import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './../../containers/todo-list';
import AddTodo from './../../containers/add-todo';
import { fetchTodos } from './../../actions/todo-actions';

class TodosPage extends Component {

  componentWillMount () {
    this.props.fetchTodos();
  }

  render () {
    return (
      <div>
        <h2>This is the todos page</h2>
        <AddTodo />
        <TodoList />
      </div>
    );
  }
}

export default connect(
  undefined,
  { fetchTodos }
)(TodosPage);
