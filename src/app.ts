/*
  Image Processing API Entry Point
*/

// Imports
import express from 'express';

// Constants and Requires
const app = express();
const PORT = 3000;

// Middlewares

// Routes
// app.use("/api/v1/images", )

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
