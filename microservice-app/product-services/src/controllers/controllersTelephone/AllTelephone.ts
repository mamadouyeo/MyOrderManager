import { Request, Response } from "express";
import { Telephone } from "../../models/TelephonModel";


// Contrôleur pour récupérer tous les télephones
const Alltelephone = async (req: Request, res: Response): Promise<Response> => {
  try {


    // Récupération des telephones depuis la base de données
    const All = await Telephone.find();


    // Si des telephones sont trouvés, on les renvoie avec un code de statut 200
    return res.status(200).json({
      message: "Liste des telephones",
      data: All,
    });
  } catch (error) {
    // Gestion des erreurs avec log
    console.error('Erreur lors de la récupération des telephones :', error);

    // Gestion d'erreurs personnalisée
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    } else {
      return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  }
};

export { Alltelephone };
