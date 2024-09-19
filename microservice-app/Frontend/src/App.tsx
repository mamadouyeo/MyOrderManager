import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  // Barre de navigation
import Home from './pages/Home';
import Header from './composants/Header'
import Footer from './composants/Footer'
import Register from './pages/Register';
import Login from './pages/Login';
import Product from './pages/Product';
 // Import du Footer

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        {/* Contenu de la page */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/product' element={<Product/>} />
          </Routes>
        </div>
        
        {/* Footer toujours en bas */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
