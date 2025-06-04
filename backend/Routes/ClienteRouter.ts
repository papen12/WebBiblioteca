import { Router } from "express";
import { ClienteController } from "../Controllers/ClienteController";

const clienteRouter = Router();

clienteRouter.get("/", ClienteController.getCliente);
clienteRouter.get("/:ci", ClienteController.getClienteId);
clienteRouter.post("/", ClienteController.createCliente);
clienteRouter.put("/:ci", ClienteController.updateCliente);
clienteRouter.delete("/:ci", ClienteController.deleteCliente);

export default clienteRouter;
