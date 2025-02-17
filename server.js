
import express, { json, urlencoded } from 'express';
import userRoutes from './routes/userRoutes.js'

const app = express();
const port = 8080;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/users',userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
