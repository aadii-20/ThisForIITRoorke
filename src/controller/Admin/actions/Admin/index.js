import  express from "express";
import bodyParser from 'body-parser';
import 'dotenv/config';
import stringFunction from '../../../../config/db/index.js';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import Journal from "../../../../model/Paper/Journals/Journals.js";
import Project from "../../../../model/Teachings/projects/index.js";
import Conference from "../../../../model/Paper/Conference/Conference.js";
const router = express.Router();
import authentication from "../../../../middleware/authFromTokenForAdmin/index.js";
router.use(authentication);

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

export const getHelloWorld = (async(req,res)=>{
    try {
        res.status(200).send("Hello World")
    } catch (error) {
        res.status(400).send({'message':error})
    }
})


// This is for creation in Publication By Admin which have collections are Journal,Conference,Workshops,Patents1,Patents2,Books

export const createPublicationJournal = (async(req,res)=>{
    try {
        await connectClient();
        const publicationJSON = new Journal(req.body);
        const savePublications = await publicationJSON.save();
        const database = User.db("Paper")
        const JournalDatabase = database.collection("Journals")
       const data = await JournalDatabase.insertOne(savePublications);
       console.log(data)
          res.status(200).send({data:data});
    } catch (error) {
        res.status(500).send({'message':error})
    }
})

export const createPublicationConference = (async(req,res)=>{
    try {
        await connectClient();
        const publicationJSON = new Conference(req.body);
        const savePublications = await publicationJSON.save();
        const database = User.db("Paper")
        const ConferenceDatabase = database.collection("Conference")
       const data = await ConferenceDatabase.insertOne(savePublications);
       console.log(data)
          res.status(200).send({data:data});
    } catch (error) {
        res.status(500).send({'message':error})
    }
})


export const createPublicationWorkshops = (async(req,res)=>{
    try {
        await connectClient();
        const publicationJSON = new Conference(req.body);
        const savePublications = await publicationJSON.save();
        const database = User.db("Paper")
        const ConferenceWorkshops = database.collection("Workshops")
       const data = await ConferenceWorkshops.insertOne(savePublications);
       console.log(data)
          res.status(200).send({data:data});
    } catch (error) {
        res.status(500).send({'message':error})
    }
})


export const createPublicationPatents1 = (async(req,res)=>{
    try {
        await connectClient();
        const publicationJSON = new Conference(req.body);
        const savePublications = await publicationJSON.save();
        const database = User.db("Paper")
        const ConferencePatents1 = database.collection("Patents1")
       const data = await ConferencePatents1.insertOne(savePublications);
       console.log(data)
          res.status(200).send({data:data});
    } catch (error) {
        res.status(500).send({'message':error})
    }
})

export const createPublicationPatents2 = (async(req,res)=>{
    try {
        await connectClient();
        const publicationJSON = new Conference(req.body);
        const savePublications = await publicationJSON.save();
        const database = User.db("Paper")
        const ConferencePatents2 = database.collection("Patents2")
       const data = await ConferencePatents2.insertOne(savePublications);
       console.log(data)
          res.status(200).send({data:data});
    } catch (error) {
        res.status(500).send({'message':error})
    }
})




export const createPublicationBooks = (async(req,res)=>{
    try {
        await connectClient();
        const publicationJSON = new Journal(req.body);
        const savePublications = await publicationJSON.save();
        const database = User.db("Paper")
        const JournalDatabase = database.collection("Books")
       const data = await JournalDatabase.insertOne(savePublications);
       console.log(data)
          res.status(200).send({data:data});
    } catch (error) {
        res.status(500).send({'message':error})
    }
})


// This is for updating in Publication By Admin which have collections are Journal,Conference,Workshops,Patents1,Patents2,Books





// This is for creation in projects By Admin which have collections are projects


export const createProjects = (async(req,res)=>{
    try {
        await connectClient();
        const publicationJSON = new Project(req.body);
        const savePublications = await publicationJSON.save();
        const database = User.db("Teachings")
        const JournalDatabase = database.collection("projects")
       const data = await JournalDatabase.insertOne(savePublications);
       console.log(data)
          res.status(200).send({data:data});
    } catch (error) {
        res.status(500).send({'message':error})
    }
})


export const updateProject = (async(req,res)=>{
    try {
        await connectClient();
        const titleFilter = req.body.title;
        const { projectTitle, typeOfProject, roleInProject, sponsors,collaboration,total_grant_inr,total_grant_usd,duration,additionalInfo} = req.body;

       console.log(titleFilter)
        const database = User.db("Teachings");
        const postData = database.collection("projects");
    
        const result = await postData.findOneAndUpdate(
          { projectTitle: { $regex: titleFilter, $options: "i" } },
          {
            $set: { projectTitle, typeOfProject, roleInProject, sponsors,collaboration,total_grant_inr,total_grant_usd,duration,additionalInfo}
          },
          { returnDocument: 'after' }
        );
    

        res.status(200).send({ updateData: result });
      } catch (error) {
        res.status(500).send({ message: error.message });
      } finally {
        await closeClient();
      }
    })



    export const DeleteProject = (async(req,res)=>{
      try {
          await connectClient();
          const titleFilter = req.body.title;

          const database = User.db("Teachings");
          const postData = database.collection("projects");
      
          const result = await postData.findOneAndDelete(
            { projectTitle: { $regex: titleFilter, $options: "i" } },
            { returnDocument: 'after' }
          );
      
            console.log(result)
          res.status(200).send({ updateData: result,Document:"delete" });
        } catch (error) {
          res.status(500).send({ message: error.message });
        } finally {
          await closeClient();
        }
      })



//  

