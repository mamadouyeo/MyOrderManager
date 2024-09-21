import { Ordinateur } from '../../../models/OrdinateurModel';
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Définir le chemin absolu vers le dossier 'uploads'
const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');

// Vérifier si le dossier 'uploads' existe, sinon le créer
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Utiliser le chemin absolu
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'picture-' + uniqueSuffix + path.extname(file.originalname)); // Nom du fichier
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accepter uniquement les fichiers d'image
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées (jpeg, jpg, png, gif).'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Limite de taille de fichier à 5MB
});

// Route pour ajouter un ordinateur avec une image
const AddOrdinateur = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { marque, PurchasePrice, quantity, color, disqueDur, ram, frequence, rotation } = req.body;

    // Validation des champs requis
    if (!marque || !PurchasePrice || !quantity || !color || !disqueDur || !frequence || !ram || !rotation) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).json({ message: 'L\'image est requise.' });
    }

    // Création d'un nouvel ordinateur
    const newOrdinateur = new Ordinateur({
      marque,
      picture: req.file.filename, // Enregistrer le nom du fichier de l'image
      PurchasePrice,
      quantity,
      color,
      disqueDur,
      ram,
      frequence,
      rotation
    });

    // Enregistrement dans la base de données
    const SaveNewOrdinateur = await newOrdinateur.save();

    // Retourner une réponse en cas de succès
    return res.status(201).json({
      message: "Ordinateur enregistré avec succès",
      data: {
        id: SaveNewOrdinateur._id,
        marque: SaveNewOrdinateur.marque,
        picture: SaveNewOrdinateur.picture, // Envoyer le nom du fichier
        PurchasePrice: SaveNewOrdinateur.PurchasePrice,
        quantity: SaveNewOrdinateur.quantity,
        color: SaveNewOrdinateur.color,
        disqueDur: SaveNewOrdinateur.disqueDur,
        ram: SaveNewOrdinateur.ram,
        frequence: SaveNewOrdinateur.frequence,
        rotation: SaveNewOrdinateur.rotation
      }
    });

  } catch (error) {
    // Gestion des erreurs
    if (error instanceof multer.MulterError) {
      // Erreurs spécifiques à Multer
      return res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      return res.status(500).json({ message: 'Erreur serveur : ' + error.message });
    } else {
      return res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  }
};

// Exporter la route avec Multer
export { AddOrdinateur, upload };
