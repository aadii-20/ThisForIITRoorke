import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import stringFunction from '../../../config/db/index.js';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { stringify } from 'flatted'; // Use flatted to handle circular JSON structures
import student from '../../../model/students/student.js';
import event from '../../../model/Highlights/events.js';
import news from '../../../model/Highlights/news.js';

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
    const Conference = database.collection("Conference");
    const arrayOfConference = await Conference.find().toArray();
    const Books = database.collection("Books");
    const arrayOfBooks = await Books.find().toArray();

    // Use flatted to stringify the database object without circular reference issues
    res.status(200).send({ Journals: arrayOfJournals, Conference: arrayOfConference, Books: arrayOfBooks });
  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }
};


export const getAllStudents = async (req, res) => {

  const pipeline = [
    {
      $group: {
        _id: "$enrolledCourse",
        students: {
          $push: {
            studentId: "$_id",
            name: "$name",
            specialisation: "$specialisation",
            enrollmentYear: "$enrollmentYear",
            areaOfInterest: "$areaOfInterest",
            currentStatus: "$currentStatus",
            ...(req.query.enrolledCourse === 'B.Tech' ? {} : {
              urlToImage: "$urlToImage",
              overview: "$overview",
              researches: "$researches",
              contactInformation: {
                email: "$contactInformation.email",
                googleScholarLink: "$contactInformation.googleScholarLink",
                orcidLink: "$contactInformation.orcidLink",
                linkedLink: "$contactInformation.linkedLink",
                clickForMore: "$contactInformation.clickForMore"
              }
            })
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        enrolledCourse: "$_id",
        students: 1
      }
    }
  ];

  try {
    await connectClient();
    const database = User.db('People'); 
    const studentsCollection = database.collection('students'); 

    const students = await studentsCollection.aggregate(pipeline).toArray(); // Convert cursor to array
    console.log('Aggregated Students:', students);

    // Reshape the data into the desired format
    const result = students.reduce((acc, { enrolledCourse, students }) => {
      acc[enrolledCourse] = students;
      return acc;
    }, {});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  finally {
    await closeClient();
  }
};

export const getEvents = async (req, res) => {
  try {
    await connectClient();
    const database = User.db('Highlights'); 
    const eventCollection = database.collection('events');
      const Events = await eventCollection.find().sort({ date: -1 });
      res.status(200).json(Events);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getAllNews = async (req, res) => {
  try {
    await connectClient();
    const database = User.db('Highlights'); 
    const newsCollection = database.collection('news'); 
      const News = await newsCollection.find().sort({ createdAt: -1 }); // Newest first
      res.status(200).json(News);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Export app for further use

