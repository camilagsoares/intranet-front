
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Departamentos from "./pages/Departamentos";
import Secretarias from "./pages/Secretarias";
import Telefones from "./pages/Telefones";
// import routes from "./routes";
import Login from "./pages/Login";
const App = () => {

  const router = createBrowserRouter([{
    element: <Layout />,
    errorElement: <Error />,
    // children: routes
  }])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/departamentos" element={<Departamentos />} />
        <Route path="/secretarias" element={<Secretarias />} />
        <Route path="/telefones" element={<Telefones />} />
        <Route path="/login" element={<Login />} /> 

      </Routes>
    </Router>
  );
};

export default App;