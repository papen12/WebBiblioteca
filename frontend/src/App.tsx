import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api') // Usa el proxy configurado en vite.config.ts
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return <h1>{message || 'Cargando...'}</h1>;
}

export default App;