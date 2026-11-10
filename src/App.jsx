import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import PaymentSuccess from "./PaymentSuccess";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el formulario de registro y pago */}
        <Route path='/' element={<Home />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        {/* Opcional: Ruta 404 */}
        <Route path='*' element={<div>Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;
