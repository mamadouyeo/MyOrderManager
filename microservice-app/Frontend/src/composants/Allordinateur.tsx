import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../css/AddOrdinateur.css'; // Assurez-vous d'importer le fichier CSS

interface OrdinateurFormData {
  marque: string;
  picture: File | null;
  PurchasePrice: string;
  quantity: string;
  color: string;
  disqueDur: string;
  ram: string;
  frequence: string;
  rotation: string;
}

const AddOrdinateur: React.FC = () => {
  const [formData, setFormData] = useState<OrdinateurFormData>({
    marque: '',
    picture: null,
    PurchasePrice: '',
    quantity: '',
    color: '',
    disqueDur: '',
    ram: '',
    frequence: '',
    rotation: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'picture' && files) {
      const file = files[0];
      setFormData({
        ...formData,
        picture: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validation des champs du formulaire
    if (!formData.marque || !formData.PurchasePrice || !formData.quantity || !formData.color || !formData.disqueDur || !formData.ram || !formData.frequence || !formData.rotation) {
      alert('Veuillez remplir tous les champs requis.');
      setLoading(false);
      return;
    }

    // Création d'un FormData pour inclure l'image et les autres données
    const data = new FormData();
    data.append('marque', formData.marque);
    data.append('PurchasePrice', formData.PurchasePrice);
    data.append('quantity', formData.quantity);
    data.append('color', formData.color);
    data.append('disqueDur', formData.disqueDur);
    data.append('ram', formData.ram);
    data.append('frequence', formData.frequence);
    data.append('rotation', formData.rotation);

    if (formData.picture) {
      data.append('picture', formData.picture, formData.picture.name);
    } else {
      alert('Veuillez sélectionner une image.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/ordinateur/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Ordinateur ajouté avec succès !');
    } catch (error: any) {
      if (error.response) {
        // Réponse du serveur avec un statut différent de 2xx
        console.error('Erreur réponse serveur', error.response.data);
        alert(`Erreur serveur : ${error.response.data.message || 'Une erreur est survenue lors de l\'ajout de l\'ordinateur.'}`);
      } else if (error.request) {
        // La requête a été envoyée mais aucune réponse n'a été reçue
        console.error('Erreur requête', error.request);
        alert('Aucune réponse du serveur. Veuillez vérifier la connexion.');
      } else {
        // Autres erreurs (problème dans la configuration, etc.)
        console.error('Erreur', error.message);
        alert('Une erreur interne est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Ajouter un Ordinateur</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Image (Importer)</label>
          <input
            type="file"
            name="picture"
            onChange={handleChange}
            className="input"
            accept="image/*"
            required
          />
          {imagePreview && (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Aperçu de l'ordinateur"
                className="image-preview"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="label">Marque</label>
            <input
              type="text"
              name="marque"
              value={formData.marque}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Prix d'Achat</label>
            <input
              type="number"
              name="PurchasePrice"
              value={formData.PurchasePrice}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Quantité</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Couleur</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Disque Dur</label>
            <input
              type="text"
              name="disqueDur"
              value={formData.disqueDur}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">RAM</label>
            <input
              type="text"
              name="ram"
              value={formData.ram}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Fréquence</label>
            <input
              type="text"
              name="frequence"
              value={formData.frequence}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Rotation</label>
            <input
              type="text"
              name="rotation"
              value={formData.rotation}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Ajout en cours...' : 'Ajouter l\'Ordinateur'}
        </button>
      </form>
    </div>
  );
};

export default AddOrdinateur;
