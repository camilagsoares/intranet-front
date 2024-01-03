
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Departamentos from "./pages/Departamentos";

const App = () => {

  return (
    // <div>
    //   <Header />
    // </div>
    <Router>
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/departamentos" element={<Departamentos />} />

    </Routes>
  </Router>
  );
};

export default App;