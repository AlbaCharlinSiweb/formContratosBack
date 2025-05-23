import { Router } from 'express';
import { sendContact, createAndContract } from '../controllers/sendContactController';

const router = Router();

// Rutas CRUD
router.post('/send-contact', sendContact);
router.post('/create-and-contract', createAndContract);

export default router;