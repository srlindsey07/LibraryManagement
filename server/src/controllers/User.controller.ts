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
        // if (data) {
        //     return res.status(200).json({ data });
        // } else {
            // const users = await this.getRepository().find();
            // cache.put("data", users, 6000);
            // return res.status(200).json({ data: users });
        // }
        try {
            const users = await this.getRepository().find();

            if (!!users) {
                res.status(200).json(users);
            } else {
                res.sendStatus(204);
            }
        } catch (error: any) {
            res.sendStatus(500);
        }
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await this.getRepository().findOneBy({ id: parseInt(id) });

            if (!!user) {
                res.status(200).send(user);
            } else {
                res.sendStatus(204);
            }
        } catch (error: any) {
            res.sendStatus(500);
        }
    }
}