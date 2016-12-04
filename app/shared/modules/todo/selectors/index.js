import { selectors } from './../../../modules';
import { TODO_TYPE } from './../../../constants/data-types';
import { PENDING } from './../../fetch/constants/fetch-status';

export const getAllTodos = state => selectors.data.getAllItems(state, TODO_TYPE);
export const getTodo = (state, id) => selectors.data.getItem(state, TODO_TYPE, id);

export const getIsPending = (state, id) => selectors.fetch.getFetchStatus(state, TODO_TYPE, id) === PENDING;
