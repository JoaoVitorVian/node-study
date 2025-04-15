import express, { ErrorRequestHandler, RequestHandler } from 'express';
import userRoutes from './routes/user.routes';
import { initializeDB } from './repository/config/data-source';
import { errorHandler } from './core/middlewares/error-handler';
import { authenticate } from './core/middlewares/auth';
import authRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', authenticate as RequestHandler, userRoutes);
app.use(errorHandler as ErrorRequestHandler); 

initializeDB()
  .then(() => {
    
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });