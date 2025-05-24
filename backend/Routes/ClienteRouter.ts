import { Router } from "express";
import { ClienteController } from "../Controllers/ClienteController";

const clienteRouter = Router();

clienteRouter.get("/", ClienteController.getAll);
clienteRouter.get("/:ci", ClienteController.getById);
clienteRouter.post("/", ClienteController.create);
clienteRouter.put("/:ci", ClienteController.update);
clienteRouter.delete("/:ci", ClienteController.delete);

export default clienteRouter;
