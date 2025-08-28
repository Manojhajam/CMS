import jwt from "jsonwebtoken"


export const generateToken = (userid) => {
   try {
    const token = jwt.sign(userid, process.env.JWT_SECRET_KEY);
     return token;
   } catch (error) {
       console.log(error)
       return;
   }
}