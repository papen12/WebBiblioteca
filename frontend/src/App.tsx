// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginForm from '../src/components/login/LoginForm';
// import Perfil from '../src/components/perfil/Perfil';
// import ProtectedRoute from '../src/routes/protectedRoute';
import { AutorCarousel } from './components/ui/carrouselAutores/AutorCarousel';

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Navigate to="/login" />} />
    //   <Route path="/login" element={<LoginForm />} />
    //   <Route
    //     path="/perfil"
    //     element={
    //       <ProtectedRoute>
    //         <Perfil />
    //       </ProtectedRoute>
    //     }
    //   />
    // </Routes>
    <AutorCarousel></AutorCarousel>
  );
}
export default App;