import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addData } from './../../../../actions/item-actions';
import TodoList from './../../containers/todo-list';
import AddTodo from './../../containers/add-todo';

class TodosPage extends Component {

  componentWillMount () {
    this.props.addData('TODO_TYPE', {
      id: '123',
      title: 'This is a test'
    });
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
  state => ({}),
  { addData }
)(TodosPage);
