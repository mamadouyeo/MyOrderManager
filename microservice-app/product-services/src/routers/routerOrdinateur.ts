import { AddOrdinateur } from "../controllers/controller/controllerordinateur/add.product";
import { Router } from "express";
import { Allordinateur } from "../controllers/controller/controllerordinateur/Allordinateur";
const router = Router();






router.post('/Add',AddOrdinateur)
router.get('/All', Allordinateur)


export default router;