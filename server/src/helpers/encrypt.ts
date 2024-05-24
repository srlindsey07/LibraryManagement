import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET = "" } = process.env;

/**
 * A class for encrypting passwords, comparing passwords and generating JWTs.
 */
export class encrypt {
  static async encryptPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  
  static comparePassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(id: string) {
    return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: "1d" });
  }
}