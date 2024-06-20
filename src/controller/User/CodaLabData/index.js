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
    const Journals = database.collection("Journals");
    const arrayOfJournals = await Journals.find().toArray();
    const Conference  = database.collection("Conference");
    const arrayOfConference = await Conference.find().toArray();
    const Books  = database.collection("Books");
    const arrayOfBooks =  await Books.find().toArray();

    // Use flatted to stringify the database object without circular reference issues
    res.status(200).send({ Journals: arrayOfJournals, Conference:arrayOfConference,Books:arrayOfBooks});
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

