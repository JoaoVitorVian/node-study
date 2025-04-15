import express from 'express';
import userRoutes from './routes/user.routes';
import { initializeDB } from './repository/config/database';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

initializeDB()
  .then(() => {
    app.use('/users', userRoutes);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });