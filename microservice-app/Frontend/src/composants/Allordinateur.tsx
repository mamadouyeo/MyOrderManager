import React from 'react';
import axios from 'axios';
import '../css/AllOrdinateur.css'; // Importez votre fichier CSS

// Interface pour décrire la structure d'un objet Ordinateur
interface Ordinateur {
  _id: string;
  marque: string;
  PurchasePrice: number;
  quantity: number;
  color: string;
  picture: string;
}

// Props du composant AllOrdinateur, qui contient un tableau d'ordinateurs
interface AllOrdinateurProps {
  ordinateurs: Ordinateur[];
}

// Composant fonctionnel AllOrdinateur qui reçoit une liste d'ordinateurs en props
const AllOrdinateur: React.FC<AllOrdinateurProps> = ({ ordinateurs }) => {
  
  // Fonction pour gérer l'achat d'un ordinateur
  const handleAcheter = (ordinateur: Ordinateur) => {
    alert(`Vous avez acheté ${ordinateur.marque} pour ${ordinateur.PurchasePrice} CFA`);
  };

  // Fonction pour gérer la suppression d'un ordinateur par son ID
  const handleSupprimer = async (id: string) => {
    try {
      // Effectuer la requête DELETE pour supprimer l'ordinateur
      await axios.delete(`http://localhost:5001/api/ordinateur/${id}`);
      alert('Ordinateur supprimé avec succès');
    } catch (error) {
      // Afficher une erreur en cas de problème lors de la suppression
      console.error('Erreur lors de la suppression de l\'ordinateur:', error);
    }
  };

  return (
    <div>
      <h2>Liste des ordinateurs</h2>

      {ordinateurs.length === 0 ? (
        // Afficher un message si aucun ordinateur n'est disponible
        <p>Aucun ordinateur disponible.</p>
      ) : (
        <div className="ordinateurs-list">
          {/* Parcourir le tableau d'ordinateurs et afficher chaque ordinateur */}
          {ordinateurs.map((ordinateur) => (
            <div key={ordinateur._id} className="ordinateur-item">
              {/* Afficher l'image de l'ordinateur */}
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
                {/* Bouton pour acheter l'ordinateur */}
                <button className='button-acheter' onClick={() => handleAcheter(ordinateur)}>Acheter</button>
                {/* Bouton pour supprimer l'ordinateur */}
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
