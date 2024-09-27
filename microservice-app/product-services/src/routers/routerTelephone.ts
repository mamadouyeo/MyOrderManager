
import { AddTelephone, upload } from "../controllers/controllersTelephone/AddTelephone";
import { Router } from "express";
import { Alltelephone } from "../controllers/controllersTelephone/AllTelephone";
const router = Router()






router.get('/all',Alltelephone)
router.post('/add', upload.single('picture'), AddTelephone);
export default router;