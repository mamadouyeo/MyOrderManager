import { Request, Response } from "express";
import User from "../../models/user.model";
import { generateToken } from "../middleware/jwt";
import bcrypt from "bcrypt"; // Correction de l'importation de bcrypt

const userLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    const login = await User.findOne({ email });
    if (!login) {
      const message = `L'utilisateur avec l'email ${email} n'a pas été trouvé ou n'existe pas.`;
      return res.status(401).json({ message });
    }

    // Log temporaire pour vérifier les mots de passe
    console.log('Mot de passe reçu:', password);
    console.log('Mot de passe haché stocké:', login.password);

    const isPassWordValid = await bcrypt.compare(password, login.password);
    if (!isPassWordValid) {
      const message = 'Le mot de passe est incorrect.';
      return res.status(401).json({ message });
    }

    const token = generateToken(login._id.toString());
    const message = `L'utilisateur a été connecté avec succès.`;
    return res.status(200).json({ message, data: login, token });

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    } else {
      return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  }
}

export { userLogin };
