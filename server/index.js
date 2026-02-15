import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  'https://pct-dashboard-xi.vercel.app',
  'http://localhost:3000',
];
app.use(cors({
  origin: (origin, callback) => {
    const allowed = !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.github.io');
    callback(null, allowed);
  },
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();