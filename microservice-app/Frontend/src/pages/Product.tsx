import React, { useState } from 'react';
import FormOrdinateur from '../composants/AddOrdinateur';
import AllOrdinateur from '../composants/Allordinateur';

const Product: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {/* Barre de navigation */}
      <nav style={styles.navbar}>
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <button onClick={handleAddClick} style={styles.addButton}>
          Ajouter un Ordinateur
        </button>
      </nav>

      {/* Afficher le formulaire sous forme de boîte de dialogue */}
      {isFormVisible && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialog}>
            <button onClick={handleCloseForm} style={styles.closeButton}>
              X
            </button>
            <FormOrdinateur />
          </div>
        </div>
      )}
      <AllOrdinateur/>
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
    color: '#fff',
  },
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    width: '300px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  dialogOverlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    position: 'relative' as 'relative',
    width: '50%',
  },
  closeButton: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',

  },
};

export default Product;
