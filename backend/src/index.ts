
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import personaRouter from '../Routes/PersonaRoutes'; 
<<<<<<< HEAD
import clienteRouter from '../Routes/ClienteRoutes';
=======
import autorRouter from '../Routes/AutorRouter';
>>>>>>> 4294fc611e6f9b861720acda7e92663872ba1ce4
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

app.use('/api/persona', personaRouter);
<<<<<<< HEAD
app.use('/api/cliente',clienteRouter)
=======
app.use('/api/autor', autorRouter)

>>>>>>> 4294fc611e6f9b861720acda7e92663872ba1ce4

app.get('/api', (_req, res) => {
  res.json({ message: "Hola desde Express!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
