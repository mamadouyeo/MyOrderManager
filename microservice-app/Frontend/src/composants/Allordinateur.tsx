import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AllOrdinateur.css'; // Importez votre fichier CSS

interface Ordinateur {
  _id: string;
  marque: string;
  PurchasePrice: number;
  quantity: number;
  color: string;
  picture: string;
}

const AllOrdinateur: React.FC = () => {
  const [ordinateurs, setOrdinateurs] = useState<Ordinateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrdinateurs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ordinateur/all');
        console.log('Réponse de l\'API :', response.data);

        if (Array.isArray(response.data.data)) {
          setOrdinateurs(response.data.data);
          console.log('Ordinateurs stockés dans le state :', response.data.data);
        } else {
          throw new Error("La réponse de l'API n'est pas un tableau");
        }
      } catch (error: any) {
        setError(`Erreur lors du chargement des ordinateurs: ${error.message}`);
        console.error('Erreur lors du chargement des ordinateurs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdinateurs();
  }, []);

  const handleAcheter = (ordinateur: Ordinateur) => {
    alert(`Vous avez acheté ${ordinateur.marque} pour ${ordinateur.PurchasePrice} €`);
  };

  const handleSupprimer = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/ordinateur/${id}`);
      setOrdinateurs(ordinateurs.filter(ordinateur => ordinateur._id !== id));
      alert('Ordinateur supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ordinateur:', error);
    }
  };

  return (
    <div>
      <h2>Liste des ordinateurs</h2>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p>{error}</p>
      ) : ordinateurs.length === 0 ? (
        <p>Aucun ordinateur disponible.</p>
      ) : (
        <div className="ordinateurs-list">
          {ordinateurs.map((ordinateur) => (
            <div key={ordinateur._id} className="ordinateur-item">
              <img
              src={`http://localhost:5001/src/uploads/${ordinateur.picture}`} // Modifiez selon la structure de votre projet
              alt={ordinateur.marque}
              className="ordinateur-image"
              style={{ width: '150px', height: '150px' }}
            />
              <h3>{ordinateur.marque}</h3>
              <div className="bloc">
              <p>Prix: {ordinateur.PurchasePrice} CFA</p>
              <p>Quantité: {ordinateur.quantity}</p>
              <p>Couleur: {ordinateur.color}</p>
              </div>
              <div className="buttons">
                <button className='button-achater' onClick={() => handleAcheter(ordinateur)}>Acheter</button>
                <button className='button-supprimer' onClick={() => handleSupprimer(ordinateur._id)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrdinateur;
