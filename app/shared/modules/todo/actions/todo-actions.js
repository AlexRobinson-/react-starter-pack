import { fetchAction } from './../../../actions/fetch-actions';
import { TODO_TYPE } from './../../../constants/data-types';
import * as todoApi from './../api/todo-api';

export const fetchTodos = () => fetchAction(TODO_TYPE, 'all', todoApi.getTodos());
