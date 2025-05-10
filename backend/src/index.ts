import express from 'express';

const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.json({ message: "Hola desde Express!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});