import express from 'express';
import cors from 'cors'; // Importer le package CORS
import { mongooseHelper } from './config/db/mongoseHelper';
import OrdinateurRouter from './routers/routerOrdinateur';

const port = 5001;
const app = express();

app.use(cors()); // Activer CORS
app.use(express.json());

// Routes des utilisateurs
app.use('/api/ordinateur', OrdinateurRouter); // Ajouter le préfixe de route ici

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le service utilisateur est lancé sur le port ${port}`);
    mongooseHelper.getInstance();
});
