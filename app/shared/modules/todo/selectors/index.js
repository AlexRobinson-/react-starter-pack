import { selectors } from './../../data';
import { TODO_TYPE } from './../../../constants/data-types';

export const getAllTodos = state => selectors.getAllItems(state.data, TODO_TYPE);
export const getTodo = (state, id) => selectors.getItem(state.data, TODO_TYPE, id);
