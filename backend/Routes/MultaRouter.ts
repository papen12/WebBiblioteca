import { Router } from "express";
import { MultaController } from "../Controllers/MultaController";

const multaRouter = Router();

multaRouter.get("/", MultaController.getMulta);
multaRouter.get("/:id", MultaController.getMultaById);
multaRouter.post("/", MultaController.createMulta);
multaRouter.put("/:id", MultaController.updateMulta);
multaRouter.delete("/:id", MultaController.deleteMulta);

export default multaRouter;
