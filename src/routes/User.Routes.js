import bodyParser from 'body-parser';
import express from 'express';
import {getPublication} from '../controller/User/CodaLabData/index.js'
import {getHelloWorld} from '../controller/User/SudipRoySirData/SudiPindex.js'
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
 
 //This routes from Sudip sir lab
 router.get('/getHelloWorld',getHelloWorld);
 //This routes from coda lab
 router.get('/publication',getPublication); 




export default router;