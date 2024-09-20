import React, { useState, ChangeEvent, FormEvent } from 'react';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    alert('Ordinateur ajouté avec succès !');
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

        <button type="submit" className="button">
          Ajouter l'Ordinateur
        </button>
      </form>
    </div>
  );
};

export default AddOrdinateur;
