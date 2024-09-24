import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

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
          <Link to="/product">Produit</Link> {/* Lien vers Produit */}
        </li>
      </ul>

      {/* Liens de connexion et icone de panier */}
      <div className="logs">
        <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} /> {/* Icone panier */}
          </Link>
        </li>
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
