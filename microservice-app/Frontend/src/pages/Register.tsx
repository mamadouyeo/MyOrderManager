import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Assurez-vous que l'URL du backend est correcte
      await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      alert('Inscription réussie');
      
      // Vider les champs après une inscription réussie
      setName('');
      setEmail('');
      setPassword('');

      // Rediriger vers la page de connexion
      navigate('/login');
    } catch (error) {
      // Gestion des erreurs
      if (axios.isAxiosError(error)) {
        alert(`Erreur: ${error.response?.data?.message || 'Erreur lors de l\'inscription'}`);
      } else {
        alert('Une erreur inconnue est survenue');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">Nom</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-black text-white rounded">
        
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
