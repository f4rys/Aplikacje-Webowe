import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DodajArtykul from './components/DodajArtykul';
import Blog from './components/Blog';
import StronaGlowna from './components/StronaGlowna';
import Artykul from './components/Artykul';

const App = () => {
  return (
    <>
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/dodaj">Add Article</Link>
      </nav>
      <div className="container">
      <Routes>
        <Route path="/" element={<StronaGlowna />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/article/:id" element={<Artykul />} />
        <Route path="/dodaj" element={<DodajArtykul />} />
      </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;