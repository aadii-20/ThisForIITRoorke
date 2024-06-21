import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import stringFunction from '../../../config/db/index.js';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { stringify } from 'flatted'; // Use flatted to handle circular JSON structures

const app = express();
app.use(bodyParser.json());

const url = stringFunction.url;
const User = new MongoClient(url);

mongoose.connect(url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

let isConnected = false;

const connectClient = async () => {
  if (!isConnected) {
    await User.connect();
    isConnected = true;
  }
};

const closeClient = async () => {
  if (isConnected) {
    await User.close();
    isConnected = false;
  }
};

export const getPublication = async (req, res) => {
  try {
    await connectClient();
    
    const database = User.db("Paper");

    // Define collections and their corresponding names
    const collections = [
        { name: "Journals", variableName: "arrayOfJournals" },
        { name: "Conference", variableName: "arrayOfConference" },
        { name: "Books", variableName: "arrayOfBooks" },
        { name: "Patents1", variableName: "arrayOfPatents1" },
        { name: "Patents2", variableName: "arrayOfPatents2" },
        { name: "Workshops", variableName: "arrayOfWorkshops" }
    ];

    // Fetch data for each collection and sort by year
    const results = {};
    for (const collection of collections) {
        const col = database.collection(collection.name);
        results[collection.variableName] = await col.find().sort({ year: -1 }).toArray();
    }

    // Respond with all arrays in a single object
    res.status(200).send(results);
} catch (error) {
    res.status(500).send({ message: error.message });
} finally {
    await closeClient();
}
};


export const getAllStudents = async(req,res)=>{
    try {
        await connectClient();
    } catch (error) {
        
    }
    finally
    {
     await closeClient();
    }
}


// Export app for further use

