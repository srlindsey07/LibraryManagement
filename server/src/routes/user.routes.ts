import express from "express";
import { authentication } from "../middleware/authentication.middleware";
import { authorization } from "../middleware/authorization.middleware";
import { UserRole } from "../entities/User";
import Controller from "../controllers/User.controller";

const Router = express.Router();
const UserController = new Controller();

Router.get("/users", authentication, authorization([UserRole.ADMIN]), UserController.getAllUsers.bind(UserController));

export { Router as userRouter };