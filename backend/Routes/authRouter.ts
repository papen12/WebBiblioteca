import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.get("/profile", AuthController.profile);
AuthRouter.get("/test", (_req, res):any => res.json({ message: "Router OK" }));


export default AuthRouter;
