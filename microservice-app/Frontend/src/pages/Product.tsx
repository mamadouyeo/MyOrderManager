import React, { useState, useEffect } from 'react';
import FormOrdinateur from '../composants/AddOrdinateur';
import FormTelephone from '../composants/AddTelephone';
import FormImprimante from '../composants/AddImprimante';
import AllOrdinateur from '../composants/Allordinateur';
import AllTelephone from '../composants/Alltelephone';
import AllImprimante from '../composants/Allimprimante';
import axios from 'axios';

interface Produit {
  _id: string;
  marque: string;
  quantity: number;
  color: string;
  picture: string;
}

interface Ordinateur extends Produit {
  purchasePrice: number;
}

interface Telephone extends Produit {
  purchasePrice: string;
}

interface Imprimante extends Produit {
  purchasePrice: string;
}

const Product: React.FC = () => {
  const [isAddOptionsVisible, setIsAddOptionsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAllProductsVisible, setIsAllProductsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [ordinateurs, setOrdinateurs] = useState<Ordinateur[]>([]);
  const [telephones, setTelephones] = useState<Telephone[]>([]);
  const [imprimantes, setImprimantes] = useState<Imprimante[]>([]);
  const [filteredOrdinateurs, setFilteredOrdinateurs] = useState<Ordinateur[]>([]);
  const [filteredTelephones, setFilteredTelephones] = useState<Telephone[]>([]);
  const [filteredImprimantes, setFilteredImprimantes] = useState<Imprimante[]>([]);
  const [selectedForm, setSelectedForm] = useState('');
  const [showOrdinateurs, setShowOrdinateurs] = useState(false);
  const [showTelephones, setShowTelephones] = useState(false);
  const [showImprimantes, setShowImprimantes] = useState(false);

  const fetchData = async (endpoint: string, setData: Function, setFilteredData: Function) => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error(`Erreur lors du chargement des données depuis ${endpoint} :`, error);
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5001/api/ordinateur/all', setOrdinateurs, setFilteredOrdinateurs);
    fetchData('http://localhost:5001/api/telephone/all', setTelephones, setFilteredTelephones);
    fetchData('http://localhost:5001/api/imprimante/all', setImprimantes, setFilteredImprimantes);
  }, []);

  useEffect(() => {
    const filteredOrdinateurResults = ordinateurs.filter(ordinateur =>
      ordinateur.marque.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredTelephoneResults = telephones.filter(telephone =>
      telephone.marque.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredImprimanteResults = imprimantes.filter(imprimante =>
      imprimante.marque.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredOrdinateurs(filteredOrdinateurResults);
    setFilteredTelephones(filteredTelephoneResults);
    setFilteredImprimantes(filteredImprimanteResults);
  }, [searchTerm, ordinateurs, telephones, imprimantes]);

  const handleAddClick = () => {
    setIsAddOptionsVisible(true);
    setIsFormVisible(false); // Masquer le formulaire actuel
    setIsAllProductsVisible(false); // Masquer les produits
    setShowOrdinateurs(false);
    setShowTelephones(false);
    setShowImprimantes(false);
  };

  const handleShowAllClick = () => {
    setIsAllProductsVisible(true);
    setIsAddOptionsVisible(false); // Masquer les options d'ajout
    setIsFormVisible(false); // Masquer le formulaire
    setShowOrdinateurs(false);
    setShowTelephones(false);
    setShowImprimantes(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleShowForm = (formType: string) => {
    setSelectedForm(formType);
    setIsFormVisible(true);
    setIsAddOptionsVisible(false); // Masquer les options d'ajout
    setIsAllProductsVisible(false); // Masquer la liste des produits
  };

  const handleShowOrdinateurs = () => {
    setShowOrdinateurs(true);
    setShowTelephones(false);
    setShowImprimantes(false);
  };

  const handleShowTelephones = () => {
    setShowOrdinateurs(false);
    setShowTelephones(true);
    setShowImprimantes(false);
  };

  const handleShowImprimantes = () => {
    setShowOrdinateurs(false);
    setShowTelephones(false);
    setShowImprimantes(true);
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
        </div>
        <button onClick={handleAddClick} style={styles.addButton}>
          Ajouter un Produit
        </button>
        <button onClick={handleShowAllClick} style={styles.showButtons}>
          Afficher tous les Produits
        </button>
      </nav>

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

      {isFormVisible && selectedForm === 'ordinateur' && <FormOrdinateur />}
      {isFormVisible && selectedForm === 'telephone' && <FormTelephone />}
      {isFormVisible && selectedForm === 'imprimante' && <FormImprimante />}

      {isAllProductsVisible && (
        <div style={styles.productOptions}>
          <button onClick={handleShowOrdinateurs} style={styles.showButtonBlack}>Ordinateurs</button>
          <button onClick={handleShowTelephones} style={styles.showButtonBlack}>Téléphones</button>
          <button onClick={handleShowImprimantes} style={styles.showButtonBlack}>Imprimantes</button>
        </div>
      )}

      {showOrdinateurs && <AllOrdinateur ordinateurs={filteredOrdinateurs} />}
      {showTelephones && <AllTelephone telephones={filteredTelephones} />}
      {showImprimantes && <AllImprimante imprimantes={filteredImprimantes} />}
    </div>
  );
};

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
    border: '1px solid #ccc',
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
  showButtonBlack: {
    padding: '10px 20px',
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  addOptions: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  productOptions: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
};

export default Product;
