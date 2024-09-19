import { Ordinateur } from '../../../models/OrdinateurModel';
import { Request, Response } from 'express';

const AddOrdinateur = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { marque, picture, PurchasePrice, quantity, color, disqueDur, ram, frequence, rotation } = req.body;

    // Validation des champs requis
    if (!marque || !picture || !PurchasePrice || !quantity || !color || !disqueDur || !frequence || !ram || !rotation) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Création d'un nouvel ordinateur
    const newOrdinateur = new Ordinateur({
      marque,
      picture,
      PurchasePrice,
      quantity,
      color,
      disqueDur,
      ram,
      frequence,
      rotation
    });

    // Enregistrement dans la base de données
    const SaveNewOrdinateur = await newOrdinateur.save();

    // Retourne une réponse en cas de succès
    return res.status(201).json({
      message: "Ordinateur enregistré avec succès",
      data: {
        id: SaveNewOrdinateur._id,
        marque: SaveNewOrdinateur.marque,
        picture: SaveNewOrdinateur.picture,
        PurchasePrice: SaveNewOrdinateur.PurchasePrice,
        quantity: SaveNewOrdinateur.quantity,
        color: SaveNewOrdinateur.color,
        disqueDur: SaveNewOrdinateur.disqueDur,
        ram: SaveNewOrdinateur.ram,
        frequence: SaveNewOrdinateur.frequence,
        rotation: SaveNewOrdinateur.rotation
      }
    });

  } catch (error) {
    // Gestion des erreurs
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    } else {
      return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  }
};

export { AddOrdinateur };
