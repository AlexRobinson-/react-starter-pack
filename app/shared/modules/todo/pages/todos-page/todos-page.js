import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './../../containers/todo-list';
import AddTodo from './../../containers/add-todo';
import FetchStatus from './../../../fetch/components/fetch-status';
import { fetchTodos } from './../../actions/todo-actions';
import { TODO_TYPE } from './../../../../constants/data-types';

class TodosPage extends Component {

  componentWillMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <div>
        <h2>This is the todos page</h2>
        <AddTodo />
        <FetchStatus dataType={TODO_TYPE} dataRef='all'>
          <TodoList />
        </FetchStatus>
      </div>
    );
  }
}

export default connect(
  undefined,
  { fetchTodos }
)(TodosPage);
