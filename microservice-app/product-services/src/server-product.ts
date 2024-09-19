import express from 'express';
import detenv from 'dotenv';
import { mongooseHelper } from './config/db/mongoseHelper';
import OrdinateurRouter from './routers/routerOrdinateur'

const port = 5001;
const app = express();
app.use(express.json());


// Routes des utilisateurs
app.use(OrdinateurRouter);








// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le service utilisateur est lancé sur le port ${port}`);
     mongooseHelper.getInstance();
  });
  