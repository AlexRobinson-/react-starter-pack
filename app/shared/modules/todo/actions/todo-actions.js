import { v4 } from 'uuid';
import { fetchAction, fetchCreateAction, fetchDeleteAction } from './../../fetch/actions/fetch-actions';
import { TODO_TYPE } from './../../../constants/data-types';
import * as todoApi from './../api/todo-api';

export const fetchTodos = () => fetchAction(TODO_TYPE, 'all', todoApi.getTodos());

export const createTodo = todo => fetchCreateAction(TODO_TYPE, todo, todoApi.createTodo(todo));

export const deleteTodo = id => fetchDeleteAction(TODO_TYPE, id, todoApi.deleteTodo(id));
