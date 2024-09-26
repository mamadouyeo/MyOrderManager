import { Request, Response } from "express";
import { Ordinateur } from "../../../models/OrdinateurModel";


// Contrôleur pour récupérer tous les ordinateurs
const Allordinateur = async (req: Request, res: Response): Promise<Response> => {
  try {


    // Récupération des ordinateurs depuis la base de données
    const All = await Ordinateur.find();


    // Si des ordinateurs sont trouvés, on les renvoie avec un code de statut 200
    return res.status(200).json({
      message: "Liste des ordinateurs",
      data: All,
    });
  } catch (error) {
    // Gestion des erreurs avec log
    console.error('Erreur lors de la récupération des ordinateurs :', error);

    // Gestion d'erreurs personnalisée
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    } else {
      return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  }
};

export { Allordinateur };
