const express = require('express');
const cors = require('cors')
const propertiesRouter = require('./routes/propertiesRoute')
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
//const cookieParser = require('cookie-parser')
const path = require('path'); // Import path module for consistency
const app = express()

app.use(express.json());



//app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL change to production URL
  credentials: true, // Allow credentials (cookies) to be sent
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

// Serve static files (e.g., images) from a folder
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

  //Routes
  app.use('/api/v1/properties', propertiesRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);

  module.exports = app;