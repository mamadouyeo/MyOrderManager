
import { AddImprimante, upload } from "../controllers/Imprimante/AddImprimante";
import { Router } from "express";
import { AllImprimante } from "../controllers/Imprimante/AllImprimante";
const router = Router()






router.get('/all',AllImprimante)
router.post('/add', upload.single('picture'), AddImprimante);


export default router;