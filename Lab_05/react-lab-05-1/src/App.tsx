import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Zad1 from "./components/zadania/Zad1";
import Zad2 from "./components/zadania/Zad2";
import Zad3 from "./components/zadania/Zad3";
import Zad4 from "./components/zadania/Zad4";
import Zad5 from "./components/zadania/Zad5";
import Zad6 from "./components/zadania/Zad6";
import Zad7 from "./components/zadania/Zad7";

function App() {
  return (
    <Router>
      <Navbar />{" "}
      <div className="container">
        <Routes>
          <Route path="/zad1" element={<Zad1 />} />
          <Route path="/zad2" element={<Zad2 />} />
          <Route path="/zad3" element={<Zad3 />} />
          <Route path="/zad4" element={<Zad4 />} />
          <Route path="/zad5" element={<Zad5 />} />
          <Route path="/zad6" element={<Zad6 />} />
          <Route path="/zad7" element={<Zad7 />} />
        </Routes>{" "}
      </div>
    </Router>
  );
}

export default App;
