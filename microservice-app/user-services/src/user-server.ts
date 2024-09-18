import express from 'express';
import cors from 'cors';
import { mongooseHelper } from './config/db/mongoseHelper';
import userRouter from './router/routerPost';

const port = 5000;
const app = express();

// Configuration CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Autorise le frontend à communiquer avec l'API
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
}));

app.use(express.json()); // Middleware pour interpréter le JSON

// Routes des utilisateurs
app.use('/api/users', userRouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le service utilisateur est lancé sur le port ${port}`);
  mongooseHelper.getInstance();
});
