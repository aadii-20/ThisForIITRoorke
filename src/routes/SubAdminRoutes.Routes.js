import bodyParser from 'body-parser';
import express from 'express';
import subAdminAutheatioaction from '../middleware/authFromTokenForSAdmin/index.js'
const router = express.Router();


router.use(subAdminAutheatioaction)
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());


// router.get('/createPublication',createPublication);




export default router;