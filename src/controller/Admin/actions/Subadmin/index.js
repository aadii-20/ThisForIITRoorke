import  express from "express";
const router = express.Router();
import authentication from "../../../../middleware/authFromTokenForSAdmin/index.js";
router.use(authentication);

const getHelloWorld = (async(req,res)=>{
    try {
        res.status(200).send("Hello World")
    } catch (error) {
        res.status(400).send({'message':error})
    }
})

export default getHelloWorld;