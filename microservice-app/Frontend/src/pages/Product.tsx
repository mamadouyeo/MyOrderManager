import React, { useState, useEffect } from 'react';
import FormOrdinateur from '../composants/AddOrdinateur';
 import FormTelephone from '../composants/AddTelephone'; // Supposons que vous ayez un composant pour ajouter un téléphone
 import FormImprimante from '../composants/AddImprimante'; // Supposons que vous ayez un composant pour ajouter une imprimante
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
  const [isAddOptionsVisible, setIsAddOptionsVisible] = useState(false); // Contrôle la visibilité des trois boutons
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAllOrdinateurVisible, setIsAllOrdinateurVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ordinateurs, setOrdinateurs] = useState<Ordinateur[]>([]);
  const [filteredOrdinateurs, setFilteredOrdinateurs] = useState<Ordinateur[]>([]);
  const [selectedForm, setSelectedForm] = useState(''); // Suivi du formulaire à afficher

  useEffect(() => {
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

  // Afficher les options d'ajout
  const handleAddClick = () => {
    setIsAddOptionsVisible(true);
    setIsAllOrdinateurVisible(false);
  };

  // Afficher tous les ordinateurs
  const handleShowAllClick = () => {
    setIsAllOrdinateurVisible(true);
    setIsAddOptionsVisible(false);
    setIsFormVisible(false);
    setFilteredOrdinateurs(ordinateurs); // Réinitialiser la recherche
  };

  // Fonction pour gérer le changement du champ de recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour effectuer la recherche
  const handleSearchClick = () => {
    const filtered = ordinateurs.filter(ordinateur =>
      ordinateur.marque.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrdinateurs(filtered);
  };

  // Fonction pour afficher le formulaire correspondant
  const handleShowForm = (formType: string) => {
    setSelectedForm(formType);
    setIsFormVisible(true);
    setIsAddOptionsVisible(false);
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
          Ajouter un Produit
        </button>
        <button onClick={handleShowAllClick} style={styles.showButtons}>
          Afficher tous les Produits
        </button>
      </nav>

      {/* Afficher les boutons Ajouter un Ordinateur, Téléphone, Imprimante */}
      {isAddOptionsVisible && (
        <div style={styles.addOptions}>
          <button onClick={() => handleShowForm('ordinateur')} style={styles.addButton}>
            Ordinateur
          </button>
          <button onClick={() => handleShowForm('telephone')} style={styles.addButton}>
            Téléphone
          </button>
          <button onClick={() => handleShowForm('imprimante')} style={styles.addButton}>
            Imprimante
          </button>
        </div>
      )}

      {/* Afficher le formulaire en fonction de selectedForm */}
      {isFormVisible && selectedForm === 'ordinateur' && <FormOrdinateur />}
      {isFormVisible && selectedForm === 'telephone' && <FormTelephone />}
      {isFormVisible && selectedForm === 'imprimante' && <FormImprimante />} 

      {/* Afficher tous les ordinateurs */}
      {isAllOrdinateurVisible && (
        <AllOrdinateur ordinateurs={filteredOrdinateurs} />
      )}
    </div>
  );
};

// Styles CSS en ligne
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
    backgroundColor: '#f0a50f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
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
  addOptions: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
};

export default Product;
