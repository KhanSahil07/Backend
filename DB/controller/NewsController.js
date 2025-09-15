import vine,{ errors } from "@vinejs/vine";

import { newsSchema } from "../validations/newsValidation.js";







class newsController{



static async index(req,res){





}





static async store(req, res) {

try {

const user = req.user;



// File required check

if (!req.files || !req.files.image) {

return res.status(400).json({ message: "Image is required" });

}



const imageFile = req.files.image;

const fileName = `${Date.now()}_${imageFile.name}`;

const uploadPath = `uploads/${fileName}`;



// File move

await imageFile.mv(uploadPath);



// Prepare body for validation (add image as string)

const body = {

...req.body,

image: uploadPath, // <-- VineJS expects a string

};



// Validate with Vine

const validator = vine.compile(newsSchema);

const payload = await validator.validate(body);



return res.status(200).json({

status: 200,

message: "News created successfully",

data: {

...payload,

user_id: user.id,

},

});

} catch (error) {

console.error("the error is", error);

if (error instanceof errors.E_VALIDATION_ERROR) {

return res.status(400).json({ errors: error.messages });

} else {

return res

.status(500)

.json({ status: 500, message: "something went wrong, please try again!" });

}

}

}





static async show(req,res){



}







static async update(req,res){



}

static async destroy(req,res){



}



}



export default newsController;