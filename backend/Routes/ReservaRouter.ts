import { Router } from "express";
import { ReservaController } from "../Controllers/ReservaController";

const reservaRouter = Router();

reservaRouter.get("/", ReservaController.getReservas);
reservaRouter.get("/:id", ReservaController.getReservaById);
reservaRouter.post("/", ReservaController.createReserva);
reservaRouter.put("/:id", ReservaController.updateReserva);
reservaRouter.delete("/:id", ReservaController.deleteReserva);

export default reservaRouter;
