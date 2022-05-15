/*
  Image Processing API Entry Point
*/

// Imports
import express from 'express';
import { router as images } from './Routes/images';
import { infoLoggerMW } from './Middlewares/logger';
import { notFound } from './Middlewares/notFound';
import { errorHandlerMW } from './Middlewares/errorHandlerMW';
// Constants and Requires
const app = express();
const PORT = 3000;

// Routes & Middlewares
app.use(infoLoggerMW);

app.use('/api/v1/images', images);

app.use(notFound);
app.use(errorHandlerMW);
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

// For Testing Purposes
export { app };
