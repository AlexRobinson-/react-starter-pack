import { fetchAction } from './../../fetch/actions/fetch-actions';
import { TODO_TYPE } from './../../../constants/data-types';
import * as todoApi from './../api/todo-api';

export const fetchTodos = () => fetchAction(TODO_TYPE, 'all', todoApi.getTodos());

export const createTodo = todo => fetchAction(TODO_TYPE, 'create', todoApi.createTodo(todo));

export const deleteTodo = id => fetchAction(TODO_TYPE, id, todoApi.deleteTodo(id));
