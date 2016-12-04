import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import todoApi from './api/todo-api';
import errorHandler from './utils/error-handler';

const app = express();
const PORT = process.env.PORT || 3001;

const delay = timeout => (req, res, next) => {
  setTimeout(next, timeout);
};

app.use(delay(2000));

app.use(cors());
app.use(json());

app.use('/todos', todoApi);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Api server listening on port ${PORT}`));
