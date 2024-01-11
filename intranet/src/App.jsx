
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth.context.jsx'

import Departamentos from "./pages/Departamentos/Departamentos";
import Secretarias from "../src/pages/Secretarias/Secretarias";
import Telefones from "../src/pages/Telefones/Telefones";
import Index from "./pages/Index";
import Login from "./pages/Login/Login.jsx";
import Layout from "./components/Layout";
import Error from './pages/Error/Error.jsx'
import { GlobalStyle } from "./styles/global";
import './index.css'


const App = () => {

  return (
      <Router>
        <GlobalStyle />
        <AuthContextProvider>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/departamentos" element={<Departamentos />} />
            <Route path="/secretarias" element={<Secretarias />} />
            <Route path="/telefones" element={<Telefones />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />}></Route>
          </Route>
        </Routes>
        </AuthContextProvider>
      </Router>
  );
};

export default App;