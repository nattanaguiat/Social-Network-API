import express from 'express';
import routes from './routes/index.js';
import connectDB from './config/connection.js';
import { MongoClient } from 'mongodb';

connectDB();

const PORT = process.env.PORT || 3001;
const app = express();

// Connection string to local instance of MongoDB
const connectionStringURI = `mongodb://127.0.0.1:27017`;

// Initialize a new instance of MongoClient
const client = new MongoClient(connectionStringURI);

const dbName = 

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});