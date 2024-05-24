import dotenv from "dotenv";
import User from "../entities/User";
import { Request, Response } from "express";
import { encrypt } from "../helpers/encrypt";
import { UserResponse } from "../dto/user.dto";
import { getExpressAppInstance } from "../app-instance";

dotenv.config();

export default class AuthController{
    private dbManager;
    private userRepository;

    constructor() {}

    async login(req: Request, res: Response) {
        if (!this.dbManager) {
            this.dbManager = getExpressAppInstance()?.dbManager;
        }
        
        if (!this.userRepository) {
            this.userRepository = this.dbManager.getDataSource().getRepository(User);
        }
        
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const user = await this.userRepository.findOne({ where: { email } });
            const isPasswordValid = encrypt.comparePassword(user.password, password);
            if (!user || !isPasswordValid) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const token = encrypt.generateToken(user.id.toString());
            const userResponse: UserResponse = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            };

            return res
                .cookie("access_token", token, {
                    httpOnly: true, 
                    secure: process.env.NODE_ENV === "prod"
                })
                .status(200)
                .json({
                    message: "Login successful",
                    userResponse
                });
        } catch (error) {
            console.error(error);
            return res.status(500);
        }
    }

    async logout(req: Request, res: Response) {
        return res
            .clearCookie("access_token")
            .status(200)
            .json({ message: "Successfully logged out" });
    }
}