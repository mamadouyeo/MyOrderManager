import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Ordinateur {
  id: number;
  marque: string;
  picture: string;
  PurchasePrice: string;
  quantity: string;
  color: string;
  disqueDur: string;
  ram: string;
  frequence: string;
  rotation: string;
}

const AllOrdinateur: React.FC = () => {
  const [ordinateurs, setOrdinateurs] = useState<Ordinateur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrdinateurs = async () => {
      try {
        const response = await axios.get<Ordinateur[]>('http://localhost:5001/api/ordinateur/all');
        setOrdinateurs(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des ordinateurs.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrdinateurs();
  }, []);

  if (loading) return <p>Chargement des ordinateurs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des Ordinateurs</h1>
      <ul>
        {ordinateurs.map((ordinateur) => (
          <li key={ordinateur.id} className="border p-4 mb-2 rounded-md shadow-md">
            <img src={ordinateur.picture} alt={ordinateur.marque} className="w-24 h-24 object-cover mb-2" />
            <h2 className="font-bold">{ordinateur.marque}</h2>
            <p>Prix: {ordinateur.PurchasePrice} €</p>
            <p>Quantité: {ordinateur.quantity}</p>
            <p>Couleur: {ordinateur.color}</p>
            <p>Disque Dur: {ordinateur.disqueDur}</p>
            <p>RAM: {ordinateur.ram}</p>
            <p>Fréquence: {ordinateur.frequence}</p>
            <p>Rotation: {ordinateur.rotation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllOrdinateur;
