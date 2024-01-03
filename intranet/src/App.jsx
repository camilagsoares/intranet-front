
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Departamentos from "./pages/Departamentos";
import Secretarias from "./pages/Secretarias";
import Telefones from "./pages/Telefones";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/departamentos" element={<Departamentos />} />
        <Route path="/secretarias" element={<Secretarias />} />
        <Route path="/telefones" element={<Telefones />} />

      </Routes>
    </Router>
  );
};

export default App;