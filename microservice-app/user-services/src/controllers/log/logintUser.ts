import { Request, Response } from "express";
import User from "../../models/user.model";
import { generateToken } from "../middleware/jwt";
import bcrypt from "bcryptjs"; // Assurez-vous d'utiliser bcryptjs

const userLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    const login = await User.findOne({ email });
    if (!login) {
      return res.status(401).json({ message: `L'utilisateur avec l'email ${email} n'a pas été trouvé.` });
    }

    console.log('Mot de passe reçu:', password); // Mot de passe reçu
    console.log('Mot de passe haché stocké:', login.password); // Mot de passe dans la BD

    const isPassWordValid = await bcrypt.compare(password, login.password);
    if (!isPassWordValid) {
      return res.status(401).json({ message: 'Le mot de passe est incorrect.' });
    }

    const token = generateToken(login._id.toString());
    return res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
   // Gestion des erreurs
   if (error instanceof Error) {
    return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
  } else {
    return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
  }
  }
};

export { userLogin };
