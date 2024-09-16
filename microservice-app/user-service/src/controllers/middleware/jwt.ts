import Jwt from "jsonwebtoken";
import { jwt_key } from "./key_jwt"; 

const generateToken = (userId: string): string => {
  return Jwt.sign({ id: userId }, jwt_key, { expiresIn: '24h' });
};

export { generateToken };
