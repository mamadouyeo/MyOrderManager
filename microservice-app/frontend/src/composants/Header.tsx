import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      {/* Logo ou nom du site */}
      <div className="logo">
        <h1>Mon Application</h1>
      </div>

      {/* Liens de navigation */}
      <ul className="nav-links">
        <li>
          <Link to="/">Accueil</Link> {/* Lien vers Home */}
        </li>
        <li>
          <Link to="/products">Produit</Link> {/* Lien vers Produit */}
        </li>
      </ul>

      {/* Liens de connexion */}
      <div className="logs">
        <li>
          <Link to="/register">S'inscrire</Link> {/* Lien vers Register */}
        </li>
        <li>
          <Link to="/login">Connexion</Link> {/* Lien vers Login */}
        </li>
      </div>
    </nav>
  );
};

export default Header;
