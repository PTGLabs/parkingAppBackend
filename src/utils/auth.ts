
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const createJWT = (email: string) => {
console.log("JWT");
console.log(email, process.env.ACCESS_TOKEN_SECRET);
const token = jwt.sign({ email: email }, '056cc14903cbb0c9b84e48d6b492fd34405dd22535848a17dc1f4a0c1ca9fec9446c92e8337c2c1f6289642290677a0da229f2882aede97af114ec85f015abda', { expiresIn: "365d" });
console.log('token', token);
return token;
};