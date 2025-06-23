import express from 'express';
import { subirPortada } from '../Middlewares/bookCoverMiddleware';
import { BotController } from '../Controllers/BotController';

const botrouter = express.Router();

botrouter.post('/extraer-archivo', subirPortada.single('cover'), BotController.procesarImagen);

export default botrouter;