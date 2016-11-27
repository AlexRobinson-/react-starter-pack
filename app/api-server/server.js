import express from 'express';
import cors from 'cors';
import todoApi from './api/todo-api';
import errorHandler from './utils/error-handler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use('/todos', todoApi);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Api server listening on port ${PORT}`));
