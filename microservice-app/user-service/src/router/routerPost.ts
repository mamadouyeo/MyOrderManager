import { Router } from 'express';
import {createUser} from '../controllers/log/creatUser'
import {getAllUser} from '../controllers/getAllUser'
import {userLogin} from '../controllers/log/logintUser'
const router = Router();
//ajouter un utilisateur
router.post('/register',createUser);
//afficher tout les utilisateurs
  router.get('/all',getAllUser);

//loguer un utilisateus

router.post('/login',userLogin)

export default router;
