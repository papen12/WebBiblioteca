import { Router } from "express";
import { StockController } from "../Controllers/StockController";

const stockRouter = Router();

stockRouter.get("/", StockController.getStock);
stockRouter.get("/disponible", StockController.getStockDisponible);
stockRouter.get("/:id", StockController.getStockById);

export default stockRouter;
