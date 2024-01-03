
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
// import Departamentos from "./pages/Departamentos";
// import Secretarias from "./pages/Secretarias";
// import Telefones from "./pages/Telefones";
// import routes from "./routes";

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
        {/* <Route path="/departamentos" element={<Departamentos />} />
        <Route path="/secretarias" element={<Secretarias />} />
        <Route path="/telefones" element={<Telefones />} /> */}

      </Routes>
    </Router>
  );
};

export default App;