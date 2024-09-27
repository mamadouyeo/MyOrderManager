import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../../css/AddImprimante.css';

interface ImprimanteFormData {
  marque: string;
  picture: File | null;  // Utiliser File pour la gestion des fichiers
  purchasePrice: string;
  typeImprimante: string;
  color: string;
}

const AddImprimante: React.FC = () => {
  const [formData, setFormData] = useState<ImprimanteFormData>({
    marque: '',
    picture: null, // Initialiser avec null pour l'image
    purchasePrice: '',
    typeImprimante: '',
    color: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'picture' && files) {
      const file = files[0];
      setFormData({
        ...formData,
        picture: file,  // Utiliser le fichier lui-même, pas seulement son nom
      });

      // Générer l'aperçu de l'image
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

    const data = new FormData();
    data.append('marque', formData.marque);
    data.append('purchasePrice', formData.purchasePrice);
    data.append('typeImprimante', formData.typeImprimante);
    data.append('color', formData.color);

    if (formData.picture) {
      data.append('picture', formData.picture);  // Envoyer le fichier image
    }

    try {
      const response = await axios.post('http://localhost:5001/api/imprimante/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Imprimante ajoutée avec succès !');

      // Réinitialiser le formulaire après le succès de la soumission
      setFormData({
        marque: '',
        picture: null,
        purchasePrice: '',
        typeImprimante: '',
        color: '',
      });
      setImagePreview(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Erreur lors de l\'ajout de l\'imprimante:', error.response?.data);
      } else if (error instanceof Error) {
        console.error('Erreur générale:', error.message);
      } else {
        console.error('Erreur inconnue:', error);
      }
      alert('Une erreur est survenue lors de l\'ajout de l\'imprimante.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Ajouter une imprimante</h1>
      <form onSubmit={handleSubmit} className="form">
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
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Type d'Imprimante</label>
            <input
              type="text"
              name="typeImprimante"
              value={formData.typeImprimante}
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
        </div>

        <div style={{ paddingTop: '25px', marginLeft: '60px' }}>
          {imagePreview && (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Aperçu de l'imprimante"
                className="image-preview"
              />
            </div>
          )}

          <input
            type="file"
            name="picture"
            onChange={handleChange}
            className="input"
            accept="image/*"
            required
          />
        </div>

        <div style={{ marginTop: '130px' }}>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Ajout en cours...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddImprimante;
