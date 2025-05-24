
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import personaRouter from '../Routes/PersonaRoutes';
import autorRouter from '../Routes/AutorRouter';
import multaRouter from '../Routes/MultaRouter';
import reservaRouter from '../Routes/ReservaRouter';
import clienteRouter from '../Routes/ClienteRouter';
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

app.get('/api', (_req, res) => {
  res.json({ message: "Hola desde Express!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
