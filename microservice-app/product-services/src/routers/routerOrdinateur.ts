import { AddOrdinateur, upload } from "../controllers/controller/controllerordinateur/addOrdinateur";
import { Router } from "express";
import { Allordinateur } from "../controllers/controller/controllerordinateur/Allordinateur";
import { researchOrdinateur } from "../controllers/controller/controllerordinateur/researchOdinateur";
const router = Router();




// Route pour ajouter un ordinateur avec upload d'image
router.post('/add', upload.single('picture'), AddOrdinateur);
// route pour afficher les ordinateur
router.get('/all', Allordinateur)
//Route pour la recherche d'un produit
router.get('/research', researchOrdinateur)

export default router;