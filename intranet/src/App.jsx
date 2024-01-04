
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Departamentos from "./pages/Departamentos";
import Secretarias from "./pages/Secretarias";
import Telefones from "./pages/Telefones";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Layout from "./components/Layout";

const App = () => {


  return (

    <Router>
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