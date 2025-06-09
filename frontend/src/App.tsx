import './index.css';
import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/landing/Home';
import LoginForm from './components/login/LoginForm';
import Perfil from './components/perfil/Perfil';
import SignUp from './components/signUp/signUp';
import ProtectedRoute from './routes/protectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
