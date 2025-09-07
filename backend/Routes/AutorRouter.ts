import { Router } from "express";
import { AutorController } from "../Controllers/AutorController";

const autorRouter = Router();

autorRouter.get("/", AutorController.getAutor);
autorRouter.get("/:id", AutorController.getAutorById);
autorRouter.get("/nombre/:nombre",AutorController.getPorNombre)
export default autorRouter;
