
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Departamentos from "./pages/Departamentos/Departamentos";
import Secretarias from "../src/pages/Secretarias/Secretarias";
import Telefones from "../src/pages/Telefones/Telefones";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { GlobalStyle } from "./styles/global";
import './index.css'


const App = () => {

  return (
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/departamentos" element={<Departamentos />} />
            <Route path="/secretarias" element={<Secretarias />} />
            <Route path="/telefones" element={<Telefones />} />
            <Route path="/login" element={<Login />} />
          </Route>

        </Routes>
      </Router>
  );
};

export default App;