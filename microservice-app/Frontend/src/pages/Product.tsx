import React, { useState, useEffect } from 'react';
import FormOrdinateur from '../composants/AddOrdinateur';
import AllOrdinateur from '../composants/Allordinateur';
import axios from 'axios';

// Interface pour décrire la structure d'un objet Ordinateur
interface Ordinateur {
  _id: string;
  marque: string;
  PurchasePrice: number;
  quantity: number;
  color: string;
  picture: string;
}

const Product: React.FC = () => {
  // État pour contrôler la visibilité du formulaire d'ajout
  const [isFormVisible, setIsFormVisible] = useState(false);
  // État pour contrôler la visibilité de la liste des ordinateurs
  const [isAllOrdinateurVisible, setIsAllOrdinateurVisible] = useState(true);
  // État pour stocker le terme de recherche
  const [searchTerm, setSearchTerm] = useState('');
  // État pour stocker tous les ordinateurs
  const [ordinateurs, setOrdinateurs] = useState<Ordinateur[]>([]);
  // État pour stocker les ordinateurs filtrés en fonction de la recherche
  const [filteredOrdinateurs, setFilteredOrdinateurs] = useState<Ordinateur[]>([]);

  useEffect(() => {
    // Fonction pour récupérer les ordinateurs depuis l'API
    const fetchOrdinateurs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ordinateur/all');
        setOrdinateurs(response.data.data);
        setFilteredOrdinateurs(response.data.data); // Initialement, tous les ordinateurs sont affichés
      } catch (error) {
        console.error("Erreur lors du chargement des ordinateurs :", error);
      }
    };
    fetchOrdinateurs();
  }, []);

  // Fonction pour afficher le formulaire d'ajout d'ordinateur
  const handleAddClick = () => {
    setIsFormVisible(true);
    setIsAllOrdinateurVisible(false);
  };

  // Fonction pour afficher tous les ordinateurs
  const handleShowAllClick = () => {
    setIsAllOrdinateurVisible(true);
    setIsFormVisible(false);
    setFilteredOrdinateurs(ordinateurs); // Réinitialiser la recherche
  };

  // Fonction pour gérer le changement du champ de recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour effectuer la recherche d'ordinateurs
  const handleSearchClick = () => {
    const filtered = ordinateurs.filter(ordinateur =>
      ordinateur.marque.toLowerCase().includes(searchTerm.toLowerCase()) // Filtre par la marque
    );
    setFilteredOrdinateurs(filtered);
  };

  return (
    <div>
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

      {/* Afficher le formulaire quand isFormVisible est true */}
      {isFormVisible && <FormOrdinateur />}

      {/* Afficher tous les ordinateurs quand isAllOrdinateurVisible est true */}
      {isAllOrdinateurVisible && (
        <AllOrdinateur ordinateurs={filteredOrdinateurs} />
      )}
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
};

export default Product;
