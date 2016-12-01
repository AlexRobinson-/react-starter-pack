import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TODO_TYPE } from './../../../../constants/data-types';
import { getAllItems } from './../../../../reducers';
import { deleteTodo } from './../../actions/todo-actions';
import TodoItem from './../../components/todo-item';

const TodoList = ({ todos, deleteTodo }) => (
  <ul>
    {
      todos.map(todo => (
        <li key={todo.id}>
          <TodoItem
            {...todo}
            onCompleteChange={completed => {}}
          />
          <button
            onClick={() => {
                  deleteTodo(todo.id);
                }}
          >
            Delete
          </button>
        </li>
      ))
    }
  </ul>
);

export default connect(
  state => ({
    todos: getAllItems(state, TODO_TYPE)
  }),
  { deleteTodo }
)(TodoList)
