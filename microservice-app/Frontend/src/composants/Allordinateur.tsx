import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Ordinateur {
  id: number;
  marque: string;
  PurchasePrice: number;
  quantity: number;
  color: string;
  pictureUrl: string;
}

const AllOrdinateur: React.FC = () => {
  const [ordinateurs, setOrdinateurs] = useState<Ordinateur[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les ordinateurs depuis la base de données
  useEffect(() => {
    const fetchOrdinateurs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ordinateur');
        setOrdinateurs(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des ordinateurs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdinateurs();
  }, []);

  return (
    <div className="container">
      <h2>Liste des ordinateurs</h2>
      {/* Affichage du chargement si les données sont en cours de récupération */}
      {loading ? (
        <p>Chargement en cours...</p>
      ) : ordinateurs.length === 0 ? (
        <p>Aucun ordinateur disponible.</p>
      ) : (
        <div className="ordinateurs-list">
          {ordinateurs.map((ordinateur) => (
            <div key={ordinateur.id} className="ordinateur-item">
              <h3>{ordinateur.marque}</h3>
              <p>Prix: {ordinateur.PurchasePrice} €</p>
              <p>Quantité: {ordinateur.quantity}</p>
              <p>Couleur: {ordinateur.color}</p>
              <img
                src={ordinateur.pictureUrl}
                alt={ordinateur.marque}
                className="ordinateur-image"
                style={{ width: '150px', height: '150px' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrdinateur;
