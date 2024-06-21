import admin from 'firebase-admin';
import auth from '../../firbaseConfigreation/firbaseAdminCofig.js';

const a = auth;
console.log(auth.name_)
const authentication = (async (req,res,next)=>{
    const header = req.headers.authorization;


    if(!header|| !header.startsWith("Bearer"))
        {
            const statusMessage = 'Unauthorized Header. Access Denied';
            return res.status(401).send({message:statusMessage})
        }  
      
        const token = header.substring(7, header.length)
      
    if(!token)
        {
          return res.status(401).send({message:statusMessage})
        }

        admin.auth().verifyIdToken(token).then(function(decodeToken)
    {
         if(!(decodeToken.email=="harshon.btech2022@iujaipur.edu.in"))
             {
                 return res.status(401).send('Your not admin.');
             }
        
            req.headers.uid = decodeToken.uid;
         next();
    }).catch(function(error){
        console.log(error);
        res.status(401).send('Unauthorized Header. Access Denied')
    })
}
)

export default authentication;
