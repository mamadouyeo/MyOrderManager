import React, { useState } from 'react';
 import axios from 'axios';
 const Login: React.FC = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const handleSubmit = async (event: React.FormEvent) => {
 event.preventDefault();
 try {
 const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
 localStorage.setItem('token', response.data.token);
 alert('Connexion réussie');
 } catch (error) {
 alert('Erreur lors de la connexion');
 }
 };
 return (
 <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
 <h2 className="text-2xl font-semibold mb-4">Connexion</h2>
 <form onSubmit={handleSubmit}>
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
 <label className="block text-sm font-medium mb-2" htmlFor="password">Mot de 
passe</label>
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
 className="w-full py-2 bg-blue-600 text-white rounded"
 >
 Se connecter
 </button>
 </form>
 </div>
 );
 };
 export default Login