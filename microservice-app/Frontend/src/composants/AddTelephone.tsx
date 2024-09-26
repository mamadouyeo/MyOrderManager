import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../css/AddTelephone.css';

interface TelephoneFormData {
  marque: string;
  picture: File | null;
  purchasePrice: string;
  memoireInterne: string;
  memoireRam: string;
  batterie: string;
  color: string;
}

const AddTelephone: React.FC = () => {
  const [formData, setFormData] = useState<TelephoneFormData>({
    marque: '',
    picture: null,
    purchasePrice: '',
    memoireInterne: '',
    memoireRam: '',
    batterie: '',
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

    // Création d'un FormData pour inclure l'image et les autres données
    const data = new FormData();
    data.append('marque', formData.marque);
    data.append('purchasePrice', formData.purchasePrice);
    data.append('memoireInterne', formData.memoireInterne);
    data.append('memoireRam', formData.memoireRam);
    data.append('batterie', formData.batterie);
    data.append('color', formData.color);

    if (formData.picture) {
      data.append('picture', formData.picture);
    }

    try {
      const response = await axios.post('http://localhost:5001/api/telephone/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Téléphone ajouté avec succès !');

      // Réinitialiser le formulaire après le succès de la soumission
      setFormData({
        marque: '',
        picture: null,
        purchasePrice: '',
        memoireInterne: '',
        memoireRam: '',
        batterie: '',
        color: '',
      });
      // Réinitialiser l'aperçu de l'image
      setImagePreview(null); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Si c'est une erreur Axios
        console.error('Erreur lors de l\'ajout du téléphone:', error.response?.data);
      } else if (error instanceof Error) {
        // Si c'est une erreur standard
        console.error('Erreur générale:', error.message);
      } else {
        console.error('Erreur inconnue:', error);
      }
      alert('Une erreur est survenue lors de l\'ajout du téléphone.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Ajouter un Téléphone</h1>
      <form onSubmit={handleSubmit} className='form'>
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
            <label className="label">Mémoire Interne</label>
            <input
              type="text"
              name="memoireInterne"
              value={formData.memoireInterne}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Mémoire RAM</label>
            <input
              type="text"
              name="memoireRam"
              value={formData.memoireRam}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Batterie</label>
            <input
              type="text"
              name="batterie"
              value={formData.batterie}
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
                alt="Aperçu du téléphone"
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

export default AddTelephone;
