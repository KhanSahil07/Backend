import { supportFile } from "../DB/controller/config/fileSystem.js";
import {v4 as uuidv4} from "uuid"
export const imageValidator=(size,mime) => {
if (bytesTomb(size)>2){
     return "image iszw must be less than 2 mb";}
 else if(!supportFile.includes(mime)){
   return "image must be tpyev of png,jpg,jpeg,svg,gif.. ";
}
return null;
};
export const bytesTomb=(bytes) => {
return bytes/(1024*1024);
};

export const generateRandomNum= ()=>
{
    return uuidv4();
}