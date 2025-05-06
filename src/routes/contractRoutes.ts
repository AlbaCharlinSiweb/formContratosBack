import { Router } from 'express';
import { createContract } from '../controllers/contractController';

const router = Router();

router.post('/create-contract', createContract);

export default router; 