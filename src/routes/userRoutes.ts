import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateJWT } from '../middleware/authentication';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.put('/users',authenticateJWT, userController.updateUserDetails);
router.get('/usersdata/',userController.getUser)

export default router;
