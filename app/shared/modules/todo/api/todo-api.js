import api from './../../../utils/api';

const API_BASE = '/todos';

export const getTodos = () => api.get(API_BASE).then(res => res.data);

export const createTodo = todo => api.post(API_BASE, todo).then(res => res.data);

export const deleteTodo = id => api.delete(`${API_BASE}/${id}`).then(res => res.data);
