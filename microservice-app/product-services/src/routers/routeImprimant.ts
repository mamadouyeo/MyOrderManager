
import { AddImprimante, upload } from "../controllers/Imprimante/imprimante";
import { Router } from "express";
const router = Router()







router.post('/add', upload.single('picture'), AddImprimante);


export default router;