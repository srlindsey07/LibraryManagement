import { Request, Response } from "express";
import cache from "memory-cache";
import User from "../entities/User";
import BaseController from "./Base.controller";

export default class UserController extends BaseController<User> {
    constructor() {
        super(new User());
    }
    
    async getAllUsers(req: Request, res: Response) {
        const data = cache.get("data");

        // if data is alreeady cached, return it
        // else retreive data from DB, cache it and return it
        if (data) {
            return res.status(200).json({ data });
        } else {
            const users = await this.getRepository().find();
            cache.put("data", users, 6000);
            return res.status(200).json({ data: users });
        }
    }
}