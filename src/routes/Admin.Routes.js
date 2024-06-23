import bodyParser from 'body-parser';
import express from 'express';
import {createPublicationJournal, getHelloWorld,createProjects,updateProject,DeleteProject} from '../controller/Admin/actions/Admin/index.js';
import AdminAutheatioaction from '../middleware/authFromTokenForAdmin/index.js'
const router = express.Router();


//router.use(AdminAutheatioaction);
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

//This is for Publications
router.post('/createPublication/Journal',createPublicationJournal);

//This is for project
router.post('/createProject',createProjects);
router.put('/updateProject',updateProject);
router.delete('/DeleteProject',DeleteProject);
router.get('/helloWorld',getHelloWorld);



export default router;