import { Router } from 'express';
import User from '../models/user.model';
import authMiddleware from '../controllers/middleware/auut.User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const router = Router();

router.post('/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;
  
      // Vérifier si tous les champs sont fournis
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }
  
      // Vérifier si un utilisateur avec cet email existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }
  
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Créer un nouvel utilisateur
      const newUser = new User({
        name,
        email,
        password: hashedPassword, // Stocker le mot de passe haché
      });
  
      // Sauvegarder l'utilisateur dans la base de données
      const savedUser = await newUser.save();
  
      // Générer un token JWT
      const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
      // Répondre avec le token et les informations utilisateur
      res.status(201).json({
        message: 'Utilisateur créé avec succès.',
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
        token,
      });
    } catch (error) {
      // Gestion des erreurs
      if (error instanceof Error) {
        res.status(500).json({ message: 'Erreur serveur : ' + error.message });
      } else {
        res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
      }
    }
  });


router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Vérifier si l'email est fourni
      if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis' });
      }
  
      // Trouver l'utilisateur avec l'email fourni
      const user = await User.findOne({ email });
      
      // Si l'utilisateur n'existe pas ou si le mot de passe ne correspond pas
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      }
  
      // Générer un token JWT avec l'ID utilisateur
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      
      // Répondre avec le token généré
      res.json({ token });
    } catch (error) {
      // Gestion des erreurs pour les erreurs du type `Error`
      if (error instanceof Error) {
        res.status(500).json({ message: 'Erreur serveur interne : ' + error.message });
      } else {
        // Pour toute autre erreur inconnue
        res.status(500).json({ message: 'Une erreur inconnue est survenue' });
      }
    }
  });
  
  

router.get('/profile', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById((req as any).user.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
          } else {
            res.status(500).json({ message: 'Unknown error occurred' });
          }
      }
  });

export default router;
