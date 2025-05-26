import clienteRouter from '../Routes/ClienteRoutes';
import autorRouter from '../Routes/AutorRouter';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import personaRouter from '../Routes/PersonaRoutes'; 
import authRouter from '../Routes/authRouter';
import libroRouter from '../Routes/LibroRouter';


dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());



app.use('/api/persona', personaRouter);
app.use('/api/cliente',clienteRouter)
app.use('/api/autor', autorRouter)
app.use('/api/auth',authRouter)
app.use('/api/libro',libroRouter)







app.get('/api', (_req, res) => {
  res.json({ message: "Hola desde Express!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
