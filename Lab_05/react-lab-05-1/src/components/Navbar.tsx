import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/zad1">Zad 1</Link>
      <Link to="/zad2">Zad 2</Link>
      <Link to="/zad3">Zad 3</Link>
      <Link to="/zad4">Zad 4</Link>
      <Link to="/zad5">Zad 5</Link>
      <Link to="/zad6">Zad 6</Link>
      <Link to="/zad7">Zad 7</Link>
    </nav>
  );
};

export default Navbar;