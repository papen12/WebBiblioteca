import { LibroController } from "../Controllers/LibroController";
import { Router } from "express";


const libroRouter=Router()

libroRouter.get("/", LibroController.getLibro);
libroRouter.get("/id/:id", LibroController.getLibroId);
libroRouter.get("/titulo/:titulo", LibroController.getLibroPorTitulo);
libroRouter.get("/genero/:genero",LibroController.getLibroPorGenero)



export default libroRouter