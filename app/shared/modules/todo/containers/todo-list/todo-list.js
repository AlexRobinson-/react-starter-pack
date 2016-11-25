import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TODO_TYPE } from './../../../../constants/data-types';
import { getAllItems } from './../../../../reducers';
import { addData, removeData } from './../../../../actions/item-actions';
import TodoItem from './../../components/todo-item';

class TodoList extends Component {
  render () {
    return (
      <ul>
        {
          this.props.todos.map(todo => (
            <li key={todo.id}>
              <TodoItem
                {...todo}
                onCompleteChange={completed => {
                  this.props.addData(TODO_TYPE, {
                    ...todo,
                    completed
                  });
                }}
              />
              <button
                onClick={() => {
                  this.props.removeData(TODO_TYPE, todo.id)
                }}
              >
                Delete
              </button>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default connect(
  state => ({
    todos: getAllItems(state, TODO_TYPE)
  }),
  { addData, removeData }
)(TodoList)
