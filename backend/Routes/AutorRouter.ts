import { Router } from "express";
import { AutorController } from "../Controllers/AutorController";

const autorRouter = Router();

autorRouter.get("/", AutorController.getAutor);
autorRouter.get("/:id", AutorController.getAutorById);
autorRouter.post("/", AutorController.createAutor);
autorRouter.put("/:id", AutorController.updateAutor);
autorRouter.delete("/:id", AutorController.deleteAutor);

export default autorRouter;
