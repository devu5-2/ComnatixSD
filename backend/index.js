// index.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import route from './routes/userRoute.js'; // Import user routes

// Initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// SQLite setup
const dbFile = process.env.DB_FILE || 'database.db';
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
    process.exit(1);
  } else {
    console.log('SQLite DB connected successfully');
  }
});

// Define routes
app.use('/api', route(db)); // Pass db to routes

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
