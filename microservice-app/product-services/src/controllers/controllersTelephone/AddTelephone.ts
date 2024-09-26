import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Telephone } from '../../models/TelephonModel';

// Définir le chemin absolu vers le dossier 'uploads'
const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');

// Vérifier si le dossier 'uploads' existe, sinon le créer
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'picture-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtrage des fichiers image et gestion des erreurs de types de fichiers
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées (jpeg, jpg, png, gif).'));
  }
};

// Configuration de Multer avec limite de taille de fichier à 5MB
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Route pour ajouter un téléphone avec une image
const AddTelephone = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { marque, purchasePrice, memoireInterne, memoireRam, batterie, color } = req.body;

    // Validation des champs requis
    if (!marque || !purchasePrice || !memoireInterne || !memoireRam || !batterie || !color) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérification de l'image téléchargée
    if (!req.file) {
      return res.status(400).json({ message: "L'image est requise." });
    }

    // Création d'un nouveau téléphone
    const newTelephone = new Telephone({
      marque,
      picture: req.file.filename, // Stocker uniquement le nom du fichier
      purchasePrice,
      memoireInterne,
      memoireRam,
      batterie,
      color,
    });

    // Sauvegarde dans la base de données
    const savedTelephone = await newTelephone.save();

    // Retourner une réponse en cas de succès
    return res.status(201).json({
      message: 'Téléphone enregistré avec succès.',
      data: savedTelephone,
    });

  } catch (error) {
    // Gestion des erreurs spécifiques à multer et autres erreurs
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Erreur de téléchargement d\'image : ' + error.message });
    } else if (error instanceof Error) {
      return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    }
    return res.status(500).json({ message: 'Erreur inconnue.' });
  }
};

// Exportation de la route avec Multer
export { AddTelephone, upload };
