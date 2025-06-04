import { Router } from "express";
import { SignupController } from "../Controllers/signupController";

const signUpRouter = Router();
signUpRouter.post("/", SignupController.signUp);

export default signUpRouter;
