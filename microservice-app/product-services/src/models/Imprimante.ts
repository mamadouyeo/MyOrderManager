import { Schema, model, Document } from 'mongoose';

// Interface représentant les données du imprimante
interface IImprimante extends Document {
    marque: string;
    picture: string;
    purchasePrice: string; 
    typeImprimante: string; 
    color: string;
}

// Définition du schéma Mongoose
const ImprimanteSchema = new Schema<IImprimante>({
    marque: { type: String,  },
    picture: { type: String,  },
    purchasePrice: { type: String,  }, 
    typeImprimante: { type: String,  }, 
    color: { type: String,  }
}, {
    // Ajoute createdAt et updatedAt automatiquement
    timestamps: true  
});

// Création du modèle Mongoose
const Imprimante = model<IImprimante>('Imprimante', ImprimanteSchema);

export { Imprimante };
