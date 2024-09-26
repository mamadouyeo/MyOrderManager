import { Schema, model, Document } from 'mongoose';

// Interface représentant les données du téléphone
interface ITelephone extends Document {
    marque: string;
    picture: string;
    purchasePrice: string; 
    memoieInterne: string; 
    memoieRam: string; 
    baterie: string;
    color: string;
}

// Définition du schéma Mongoose
const TelephoneSchema = new Schema<ITelephone>({
    marque: { type: String,  },
    picture: { type: String,  },
    purchasePrice: { type: String,  }, 
    memoieInterne: { type: String,  }, 
    memoieRam: { type: String,  }, 
    baterie: { type: String,  },
    color: { type: String,  }
}, {
    // Ajoute createdAt et updatedAt automatiquement
    timestamps: true  
});

// Création du modèle Mongoose
const Telephone = model<ITelephone>('Telephone', TelephoneSchema);

export { Telephone };
