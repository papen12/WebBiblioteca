import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = 5000;
dotenv.config()

app.use(cors())
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: "Hola desde Express!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});