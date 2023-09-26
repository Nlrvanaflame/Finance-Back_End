import { Router } from 'express';
import * as recordController from '../controllers/recordController';
import { authenticateJWT } from '../middleware/authentication';

const router = Router();

router.get('/records',authenticateJWT, recordController.getRecords);
router.post('/records',authenticateJWT, recordController.addRecord);
router.put('/records/:id',authenticateJWT, recordController.editRecord);
router.delete('/records/:id',authenticateJWT, recordController.deleteRecord);

export default router;
