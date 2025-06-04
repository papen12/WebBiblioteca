// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginForm from '../src/components/login/LoginForm';
// import Perfil from '../src/components/perfil/Perfil';
// import ProtectedRoute from '../src/routes/protectedRoute';
// import { AutorCarousel } from './components/ui/carrouselAutores/AutorCarousel';
import SignUp from './components/signUp/signUp';
import './index.css'
// import { Home } from "./pages/landing/Home";
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
    // <AutorCarousel></AutorCarousel>
    // <Home></Home>
    <SignUp></SignUp>
  );
}
export default App;