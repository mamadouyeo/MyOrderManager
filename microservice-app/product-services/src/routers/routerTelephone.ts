
import { AddTelephone, upload } from "../controllers/controllersTelephone/AddTelephone";
import { Router } from "express";
const router = Router()







router.post('/add', upload.single('picture'), AddTelephone);


export default router;