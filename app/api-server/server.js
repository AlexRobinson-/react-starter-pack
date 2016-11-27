import express from 'express';
import todoApi from './api/todo-api';

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/todos', todoApi);

app.listen(PORT, () => console.log(`Api server listening on port ${PORT}`));
