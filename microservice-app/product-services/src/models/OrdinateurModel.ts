import { Schema, model } from 'mongoose';

interface IOrdinateur {
  marque: string;
  PurchasePrice: number;
  picture: string;
  quantity: number; 
  frequence: string;
  disqueDur: string;
  ram: string;
  color: string;
  rotation: string;
}

const OrdinateurSchema = new Schema<IOrdinateur>({
  marque: { type: String, required: true },
  picture: { type: String, required: true },
  PurchasePrice: { type: Number, required: true }, 
  quantity: { type: Number, required: true }, 
  frequence: { type: String, required: true },
  disqueDur: { type: String, required: true },
  color: { type: String, required: true },
  rotation: { type: String, required: true },
  ram: { type: String, required: true },
}, {
  timestamps: true, // Ajout des timestamps
});

const Ordinateur = model<IOrdinateur>('Ordinateur', OrdinateurSchema);

export { Ordinateur };
