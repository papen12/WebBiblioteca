import { LibroController } from "../Controllers/LibroController";
import { Router } from "express";


const libroRouter=Router()

libroRouter.get("/", LibroController.getLibro);
libroRouter.get("/libro/buscar", LibroController.getLibroTitulo);
libroRouter.get("/id/:id", LibroController.getLibroId);
libroRouter.get("/titulo/:titulo", LibroController.getLibroTitulo);



export default libroRouter