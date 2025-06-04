import { Router } from "express";
import { SignupController } from "../Controllers/signupController";

const signUpRouter = Router();
signUpRouter.post("/", SignupController.signUp);
signUpRouter.get("/",SignupController.getCliente)

export default signUpRouter;
