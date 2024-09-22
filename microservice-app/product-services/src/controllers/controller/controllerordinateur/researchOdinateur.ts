import { Ordinateur } from "../../../models/OrdinateurModel";
import {Request , Response} from "express";

const researchOrdinateur = async (req : Request, res :Response) : Promise<Response> => {

            const marque = req.query.marque as string
    try {

        const research = await Ordinateur.find({marque: marque})
        if (research.length === 0) {
            return res.status(404).json({message : "aucun resultat trouver"})
        }
        return res.status(201).json(research)
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
}

export {researchOrdinateur}