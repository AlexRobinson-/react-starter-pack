import { v4 } from 'uuid';
import {
  fetchAction,
  fetchActionDeferred,
  fetchCreateAction,
  fetchDeleteAction
} from './../../fetch/actions/fetch-actions';
import { TODO_TYPE } from './../../../constants/data-types';
import * as todoApi from './../api/todo-api';
import { withToast } from './../../toast/utils/action-creators';
import { getTodo } from './../selectors';

export const fetchTodos = () => fetchAction(TODO_TYPE, 'all', todoApi.getTodos());

export const createTodo = todo => fetchCreateAction(TODO_TYPE, todo, todoApi.createTodo(todo),
  {
    onSuccess: withToast('Created Todo')
  }
);

export const deleteTodo = id => fetchDeleteAction(
  TODO_TYPE, id, todoApi.deleteTodo(id),
  {
    onSuccess: [
      (action, { getState }) => withToast(`Deleted Todo - ${getTodo(getState(), id).title}`)(action),
      withToast('Deleted Todo')
    ]
  }
);
