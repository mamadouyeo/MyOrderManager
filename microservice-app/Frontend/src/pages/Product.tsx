import React, { useState } from 'react';
import FormOrdinateur from '../composants/AddOrdinateur';
import AllOrdinateur from '../composants/Allordinateur';

const Product: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAllOrdinateurVisible, setIsAllOrdinateurVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClick = () => {
    setIsFormVisible(true);
    setIsAllOrdinateurVisible(false);
  };

  const handleShowAllClick = () => {
    setIsAllOrdinateurVisible(true);
    setIsFormVisible(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    // Logique de recherche ici
    console.log('Recherche:', searchTerm);
  };

  return (
    <div>
      {/* Barre de navigation */}
      <nav style={styles.navbar}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
          <button onClick={handleSearchClick} style={styles.showButton}>
            Rechercher
          </button>
        </div>
        <button onClick={handleAddClick} style={styles.addButton}>
          Ajouter un Ordinateur
        </button>
        <button onClick={handleShowAllClick} style={styles.showButtons}>
          Afficher tous les Ordinateurs
        </button>
      </nav>

      <div style={styles.content}>
        {/* Afficher le formulaire quand isFormVisible est true */}
        {isFormVisible && <FormOrdinateur />}

        {/* Afficher tous les ordinateurs quand isAllOrdinateurVisible est true */}
        {isAllOrdinateurVisible && <AllOrdinateur />}
      </div>
    </div>
  );
};

// Styles CSS en ligne pour styliser la page
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f8f9f9',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    width: '250px',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  
  showButtons: {
    padding: '10px 20px',
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  showButton: {
    padding: '10px 20px',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Product;
