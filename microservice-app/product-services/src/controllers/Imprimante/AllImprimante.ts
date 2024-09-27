import { Request, Response } from "express";
import { Imprimante } from "../../models/Imprimante";


// Contrôleur pour récupérer tous les télephones
const AllImprimante = async (req: Request, res: Response): Promise<Response> => {
  try {


    // Récupération des Imprimantes depuis la base de données
    const All = await Imprimante.find();


    // Si des Imprimantes sont trouvés, on les renvoie avec un code de statut 200
    return res.status(200).json({
      message: "Liste des Imprimantes",
      data: All,
    });
  } catch (error) {
    // Gestion des erreurs avec log
    console.error('Erreur lors de la récupération des imprmantes :', error);

    // Gestion d'erreurs personnalisée
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    } else {
      return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  }
};

export { AllImprimante };
