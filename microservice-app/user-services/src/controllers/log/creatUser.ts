import { Request, Response } from 'express';
import User from '../../models/user.model';
import bcrypt from 'bcryptjs';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Mot de passe en clair:', password);
    console.log('Mot de passe haché:', hashedPassword);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({
      message: 'Utilisateur créé avec succès.',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      },
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

export { createUser };
