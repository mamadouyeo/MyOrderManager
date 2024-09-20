import { AddOrdinateur } from "../controllers/controller/controllerordinateur/add.product";
import { Router } from "express";
import { Allordinateur } from "../controllers/controller/controllerordinateur/Allordinateur";
const router = Router();






router.post('/add',AddOrdinateur)
router.get('/all', Allordinateur)


export default router;