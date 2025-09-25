import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../components/Loader/Loading';

/*---- LAZY LOADING DAS PÁGINAS ----*/
const Turismo = lazy(() => import('../pages/TurismoPage/Turismo'));
const Register = lazy(() => import('../pages/RegisterPage/Register'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Turismo />} />
        <Route path="/registrar" element={<Register />} />
      </Routes>
    </Suspense>
  );
}
