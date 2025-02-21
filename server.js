
import express, { json, urlencoded } from 'express';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors'

const app = express();
const port = 8080;

app.use(json());
app.use(cors())
app.use(urlencoded({ extended: true }));

app.use('/api/users',userRoutes)
app.use('/api/tasks',taskRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
