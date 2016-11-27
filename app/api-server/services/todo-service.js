import { v4 } from 'uuid';

/*
 * Mock db for now
 */

const db = {};

export const createTodo = async (data = {}) => {
  if (!data.title) {
    throw new Error('Title is required');
  }

  const id = v4();
  db[id] = {
    ...data,
    id
  };
  return db[id];
};

export const getTodos = async () => Object.keys(db).map(id => db[id]);
export const getTodo = async id => {
  if (!db[id]) {
    throw new Error(`Todo with id ${id} does not exist`);
  }
  return db[id];
};

export const updateTodo = async (id, data) => {
  if (!db[id]) {
    throw new Error(`Todo with id ${id} does not exist`);
  }

  db[id] = {
    ...db[id],
    ...data,
    id
  };

  return db[id]
};

export const deleteTodo = id => {
  if (!db[id]) {
    throw new Error(`Todo with id ${id} does not exist`);
  }

  const todo = { ...db[id] }; // take a copy to return after deleting
  delete db[id];
  return todo;
};


/* Mock data */
createTodo({title: 'Do something'});
createTodo({title: 'Do some stuff'});
