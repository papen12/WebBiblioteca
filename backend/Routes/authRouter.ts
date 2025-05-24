import { Router } from 'express';
import { login, perfil } from '../Controllers/AuthController';
import { authMiddleware } from '../Middlewares/authMiddleWare';

const loginRouter = Router();

loginRouter.post('/login', login);
loginRouter.get('/perfil', authMiddleware, perfil);

export default loginRouter;
