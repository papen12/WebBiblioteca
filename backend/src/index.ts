
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import personaRouter from '../Routes/PersonaRoutes'; 
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

app.use('/api/persona', personaRouter);


app.get('/api', (_req, res) => {
  res.json({ message: "Hola desde Express!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
