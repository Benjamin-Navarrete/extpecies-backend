import { BrowserRouter, Route, Routes } from "react-router-dom";

import Extpecies from "./pages/Extpecies";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Mapa from "./pages/Mapa";
import Prueba from "./pages/Prueba";
import Registro from "./pages/Registro";
import User from "./pages/User";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/extpecies" element={<Extpecies />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/mapa" element={<Mapa />} />
        </Routes>
        <Routes>
          <Route path="/prueba" element={<Prueba />} />
        </Routes>
        <Routes>
          <Route path="/registro" element={<Registro />} />
        </Routes>
        <Routes>
          <Route path="/user" element={<User />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
