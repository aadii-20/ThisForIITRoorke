import bodyParser from 'body-parser';
import express from 'express';

const router = express.Router();



router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());




export default router;