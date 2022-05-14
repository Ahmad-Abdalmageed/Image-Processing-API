/*
  Image Processing API Entry Point
*/

// Imports
import express from 'express';
import { router as images } from './Routes/images';
import { infoLoggerMW } from './Middlewares/logger';

// Constants and Requires
const app = express();
const PORT = 3000;

// Routes & Middlewares
app.use(infoLoggerMW);

app.use('/api/v1/images', images);

// Server
const startServer = (PORT: number) => {
  try {
    app.listen(PORT, () => {
      console.log(`Server Started on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer(PORT);
