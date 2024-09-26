import React from 'react';
import axios from 'axios';
import '../css/AllImprimante.css'; // Importez votre fichier CSS

interface Imprimante {
  _id: string;
  marque: string;
  picture: string;
  purchasePrice: string;
  color: string;
}

interface AllImprimanteProps {
  imprimantes: Imprimante[];
}

const AllImprimante: React.FC<AllImprimanteProps> = ({ imprimantes }) => {
  const handleAcheter = (imprimante: Imprimante) => {
    alert(`Vous avez acheté ${imprimante.marque} pour ${imprimante.purchasePrice} CFA`);
  };

  const handleSupprimer = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/imprimante/${id}`);
      alert('Imprimante supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'imprimante :', error);
    }
  };

  return (
    <div>
      <h2>Liste des imprimantes</h2>

      {imprimantes.length === 0 ? (
        <p>Aucune imprimante disponible.</p>
      ) : (
        <div className="imprimantes-list">
          {imprimantes.map((imprimante) => (
            <div key={imprimante._id} className="imprimante-item">
              <img
                src={`http://localhost:5001/src/uploads/${imprimante.picture}`}
                alt={imprimante.marque}
                className="imprimante-image"
                style={{ width: '150px', height: '150px' }}
              />
              <h3>{imprimante.marque}</h3>
              <div className="bloc">
                <p>Prix: {imprimante.purchasePrice} CFA</p>
                <p>Couleur: {imprimante.color}</p>
              </div>
              <div className="buttons">
                <button className='button-acheter' onClick={() => handleAcheter(imprimante)}>
                  Acheter
                </button>
                <button className='button-supprimer' onClick={() => handleSupprimer(imprimante._id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllImprimante;
