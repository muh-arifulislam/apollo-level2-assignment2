import express, { Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';

export const app = express();

//Application CONFIGURATION
app.use(express.json());

// Application Routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running successfully',
  });
});
