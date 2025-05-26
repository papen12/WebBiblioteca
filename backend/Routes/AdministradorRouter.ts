import { Router } from "express";
import { AdministradorController } from "../Controllers/AdministradorController";

const administradorRouter = Router();

administradorRouter.get("/", AdministradorController.getAll);
administradorRouter.get("/:ci", AdministradorController.getById);
administradorRouter.post("/", AdministradorController.create);
administradorRouter.put("/:ci", AdministradorController.update);
administradorRouter.delete("/:ci", AdministradorController.delete);

export default administradorRouter;
