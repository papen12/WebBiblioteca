import { LibroAutorController } from "../Controllers/LibroAutorController";
import { Router } from "express";


const libroAutorRouter=Router()

libroAutorRouter.get("/sinopsis", LibroAutorController.getLibrosConAutoresYSinopsis);
libroAutorRouter.get("/bio", LibroAutorController.getAutoresBio);




export default libroAutorRouter