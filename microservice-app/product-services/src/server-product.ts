import express from 'express';
import cors from 'cors'; 
import path from 'path';
import { mongooseHelper } from './config/db/mongoseHelper';
import OrdinateurRouter from './routers/routerOrdinateur';
import ImprimanteRouter from './routers/routeImprimant'
import TelephoneRouter from './routers/routerTelephone';

const port = 5001;
const app = express();

app.use(cors()); // Activer CORS
app.use(express.json());

// Servir les fichiers statiques depuis le dossier 'uploads'
app.use('/src/uploads', express.static('src/uploads'));

// Routes des ordinateurs
app.use('/api/imprimante', ImprimanteRouter); 
app.use('/api/ordinateur', OrdinateurRouter); 
app.use('/api/telephone',TelephoneRouter)
// Gestionnaire d'erreurs global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Erreur interne du serveur');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le service utilisateur est lancé sur le port ${port}`);
    mongooseHelper.getInstance();
});
