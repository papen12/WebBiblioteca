import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import multaRouter from '../Routes/MultaRouter';
import reservaRouter from '../Routes/ReservaRouter';
import autorRouter from '../Routes/AutorRouter';
import personaRouter from '../Routes/PersonaRoutes';
import authRouter from '../Routes/authRouter';
import libroRouter from '../Routes/LibroRouter';
import administradorRouter from '../Routes/AdministradorRouter';
import clienteRouter from '../Routes/ClienteRouter';
import stockRouter from '../Routes/StockRouter';  
import signUpRouter from '../Routes/signUpRouter';
import libroAutorRouter from '../Routes/LibroAutorRouter';




dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

export const CONFIG={
  n8n:{
    WEBHOOK_URL:process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook-test/imageReader'
  },
  SERVER:{
    PORT:process.env.PORT || 5000,
    ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp'], 
    MAX_FILE_SIZE: 5 * 1024 * 1024,
     UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads/book-covers'
  }
}

app.use('/api/persona', personaRouter);
app.use('/api/multa', multaRouter);
app.use('/api/reserva', reservaRouter);
app.use('/api/administrador', administradorRouter);
app.use('/api/cliente',clienteRouter)
app.use('/api/autor', autorRouter)
app.use('/api/auth',authRouter)
app.use('/api/libro',libroRouter)
app.use('/api/signup', signUpRouter);
app.use('/api/stock', stockRouter);
app.use('/api/LA',libroAutorRouter)
console.log("Ruta /api/stock cargada correctamente");
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
