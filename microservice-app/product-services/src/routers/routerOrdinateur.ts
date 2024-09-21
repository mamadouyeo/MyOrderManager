import { AddOrdinateur, upload } from "../controllers/controller/controllerordinateur/add.product";
import { Router } from "express";
import { Allordinateur } from "../controllers/controller/controllerordinateur/Allordinateur";
const router = Router();




// Route pour ajouter un ordinateur avec upload d'image
router.post('/add', upload.single('picture'), AddOrdinateur);
router.get('/all', Allordinateur)


export default router;