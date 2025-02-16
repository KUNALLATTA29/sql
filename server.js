
import express, { json, urlencoded } from 'express';
import sequelize from './config/sequilzeConfig.js'; 
const app = express();
const port = 8080;

app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
