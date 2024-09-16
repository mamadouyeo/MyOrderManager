import { Request, Response } from 'express';
import User from '../models/user.model';



const getAllUser = async (req: Request, res: Response) : Promise <Response>  =>{

    try {
        const allUser =  await User.find();
        const message = "la liste de tout les utilisateurs"
    return res.status(200).json({message, data : allUser})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
          } else {
            return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
          }
    }
}

export {getAllUser}