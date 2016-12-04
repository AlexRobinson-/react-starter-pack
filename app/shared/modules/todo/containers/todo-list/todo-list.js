import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TODO_TYPE } from './../../../../constants/data-types';
import { getAllTodos, getIsPending } from './../../selectors';
import { deleteTodo } from './../../actions/todo-actions';
import TodoItem from './../../components/todo-item';

const TodoList = ({ todos, deleteTodo, isPending }) => (
  <ul>
    {
      todos.map(todo => (
        <li key={todo.id}>
          <TodoItem
            {...todo}
            onCompleteChange={completed => {}}
          />
          <button
            disabled={isPending(todo.id)}
            onClick={() => {
                  deleteTodo(todo.id);
                }}
          >
            {isPending(todo.id) ? 'Pending...' : 'Delete'}
          </button>
        </li>
      ))
    }
  </ul>
);

export default connect(
  state => ({
    todos: getAllTodos(state, TODO_TYPE),
    isPending: id => getIsPending(state, id)
  }),
  { deleteTodo }
)(TodoList)
