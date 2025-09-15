import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine"
// controller/AutoController.js
import  {loginSchema, registerSchema}  from "../validations/authValidation.js";
// just to debug
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";





class AutoController{
     static async register(req,res){
try {
   
        const body =req.body;
        
console.log("Incoming body:",req.body);
const validator=vine.compile(registerSchema);
const payload=await validator.validate(body);

// *checking for email exist or not 
const findUser= await prisma.user.findUnique({
  where:{
    email:payload.email
  }
})
if(findUser){
  return res.status(400).json({error:{
    email:"Email is already exist .please choose another email"
}})
}
  
  // *encrpt the password
  const salt=bcrypt.genSaltSync(10)
  payload.password=bcrypt.hashSync(payload.password,salt);
  //*usnig sendind data in db
  const  user= await prisma.user.create({
    data:payload
  })

return res.json({status:200, message:"User created succesfully",salt});
} 
catch (error) {
  console.log("the error is",error);
  
    if (error instanceof errors.E_VALIDATION_ERROR) {
    //console.log(error.messages);
  return res.status(400).json({errors:error.messages});
  }
  else{
    return res.status(500).json({status:500,message:"something went wrong,please try again!"})
  }
  
    
}

    }
    
    static async login(req,res){
      try {
        const body=req.body;
        console.log("req.body type:", typeof req.body);
    console.log("req.body content:", req.body);
      const validator=vine.compile(loginSchema);
      const payload=await validator.validate(body);
       //  *find  user by email

       const findUser= await prisma.user.findUnique({
  where:{
    email:payload.email
  }
});
  
if(findUser){
  if(!bcrypt.compareSync(payload.password,findUser.password)){
     return res.status(400).json({error:{
        email:"Invalid credentails"
      },
    });
  }
   // * issue token to user
   const payloadData= {
    id:findUser.id,
    name:findUser.name,
    email:findUser.email,
    profile:findUser.profile

   }
   const token=jwt.sign(payloadData,process.env.JWT_SECRET,{
    expiresIn:"365d",
   });


  return res.json({message:"Logged in",access_token:`Bearer ${token}`});
}
      return res.status(400).json({error:{
        email:"no user found with this email"
      }});
      } 
      catch (error) {
        console.log("the error is",error);
  
    if (error instanceof errors.E_VALIDATION_ERROR) {
    //console.log(error.messages);
  return res.status(400).json({errors:error.messages});
  }
  else{
    return res.status(500).json({status:500,message:"something went wrong,please try again!"})
  }
  
    
}
        
      }
      
    }




export default AutoController;
