import { Router } from 'express';
import {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo
} from './../services/todo-service';
import ar from './../utils/async-route';

const router = new Router();

/**
 * Get todos
 */
router.get('/', async (req, res) => {
  const todos = await getTodos();

  res.send(todos);
});

/**
 * Get todo
 */
router.get('/:id', ar(async (req, res) => {
  const todo = await getTodo(req.params.id);
  res.send(todo);
}));

/**
 * Create todo
 */
router.post('/', async (req, res) => {
  const data = req.body;
  const todo = await createTodo(data);
  res.send(todo);
});

/**
 * Delete todo
 */
router.delete('/:id', async (req, res) => {
  await deleteTodo(req.params.id);
  res.sendStatus(204);
});

export default router;
