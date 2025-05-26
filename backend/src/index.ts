import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import multaRouter from '../Routes/MultaRouter';
import reservaRouter from '../Routes/ReservaRouter';
import autorRouter from '../Routes/AutorRouter';
import clienteRouter from '../Routes/ClienteRoutes';
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
app.use('/api/autor', autorRouter);
app.use('/api/multa', multaRouter);
app.use('/api/reserva', reservaRouter);
app.use("/api/administrador", );
app.use("/api/cliente", clienteRouter);
app.use('/api/cliente',clienteRouter)
app.use('/api/autor', autorRouter)
app.use('/api/auth',authRouter)
app.use('/api/libro',libroRouter)
app.get('/api', (_req, res) => {
  res.json({ message: "Hola desde Express!" });
});



//parte cambiada para configurar vagrant 
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

app.listen(5000, '0.0.0.0', () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
