import { LibroController } from "../Controllers/LibroController";
import { Router } from "express";


const libroRouter=Router()

libroRouter.get("/", LibroController.getLibro);
libroRouter.get("/id/:id", LibroController.getLibroId);
libroRouter.get("/titulo/:titulo", LibroController.getLibroTitulo);
libroRouter.get("/genero/:genero",LibroController.getLirboIsbn)



export default libroRouter