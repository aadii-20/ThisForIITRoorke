import bodyParser from 'body-parser';
import express from 'express';

import { getPublication, getAllStudents, getAllNews, getEvents } from '../controller/User/CodaLabData/index.js'

import { getPublication } from '../controller/User/CodaLabData/index.js'
import { getHelloWorld } from '../controller/User/SudipRoySirData/SudiPindex.js'

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//router.get('/SudipSir/publication',SudipSirpublication);
router.get('/CodaLab/publication', getPublication);
router.get('/CodaLab/students', getAllStudents);
router.get('/CodaLab/news', getAllNews);
router.get('/CodaLab/events', getEvents);



//This routes from Sudip sir lab
router.get('/getHelloWorld', getHelloWorld);
//This routes from coda lab
router.get('/publication', getPublication);





export default router;