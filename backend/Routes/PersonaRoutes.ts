import { Router } from "express";
import { PersonaController } from "../Controllers/PersonaController";


const router=Router()
router.get('/',PersonaController.getPersona)

export default router