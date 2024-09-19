import { Request, Response } from "express";
import { Ordinateur } from "../../../models/OrdinateurModel";



const Allordinateur = async ( req: Request, res : Response) : Promise<Response> =>{
    try {
        const All = await Ordinateur.find()
        return res.status(201).json({
            message :"liste des ordinateurs",
            data : All
        })
    } catch (error) {
       // Gestion des erreurs
    if (error instanceof Error) {
        return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
      } else {
        return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
      } 
    }
    
}

export {Allordinateur}