import express from "express";
import Controller from "../controllers/Auth.controller";

const Router = express.Router();
const AuthController = new Controller();

Router.get("/logout", AuthController.logout.bind(AuthController));
Router.post("/login", AuthController.login.bind(AuthController));

export { Router as authRouter };