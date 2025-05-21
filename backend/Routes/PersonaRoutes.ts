import { Router } from "express";
import { PersonaController } from "../Controllers/PersonaController";

const personaRouter = Router();

personaRouter.get("/", PersonaController.getPersona);
personaRouter.get("/:id", PersonaController.getPersonaById);
personaRouter.post("/", PersonaController.createPersona);
personaRouter.put("/:id", PersonaController.updatePersona);
personaRouter.delete("/:id", PersonaController.deletePersona);

export default personaRouter;
