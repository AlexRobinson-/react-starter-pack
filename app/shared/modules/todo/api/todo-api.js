import api from './../../../utils/api';

const API_BASE = '/todos';

export const getTodos = () => api.get(API_BASE).then(res => res.data);
