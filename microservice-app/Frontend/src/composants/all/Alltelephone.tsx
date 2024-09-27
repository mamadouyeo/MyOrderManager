import React from 'react';
import axios from 'axios';
import '../../css/AllTelephone.css'; // Importez votre fichier CSS

// Définition de l'interface Telephone
export interface Telephone {
  _id: string;
  marque: string;
  picture: string;
  purchasePrice: string;  // ou number selon vos besoins
  color: string;
}

// Définition de l'interface pour les props du composant
interface AllTelephoneProps {
  telephones: Telephone[];
}

// Définition du composant AllTelephone
const AllTelephone: React.FC<AllTelephoneProps> = ({ telephones }) => {
  const handleAcheter = (telephone: Telephone) => {
    alert(`Vous avez acheté ${telephone.marque} pour ${telephone.purchasePrice} CFA`);
  };

  const handleSupprimer = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/telephone/${id}`);
      alert('Téléphone supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du téléphone :', error);
    }
  };

  return (
    <div>
      <h2>Liste des téléphones</h2>

      {telephones.length === 0 ? (
        <p>Aucun téléphone disponible.</p>
      ) : (
        <div className="telephones-list">
          {telephones.map((telephone) => (
            <div key={telephone._id} className="telephone-item">
              <img
                src={`http://localhost:5001/uploads/${telephone.picture}`}
                alt={telephone.marque}
                className="telephone-image"
                style={{ width: '150px', height: '150px' }}
              />
              <h3>{telephone.marque}</h3>
              <div className="bloc">
                <p>Prix: {telephone.purchasePrice} CFA</p>
                <p>Couleur: {telephone.color}</p>
              </div>
              <div className="buttons">
                <button className='button-acheter' onClick={() => handleAcheter(telephone)}>
                  Acheter
                </button>
                <button className='button-supprimer' onClick={() => handleSupprimer(telephone._id)}>
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

export default AllTelephone;
