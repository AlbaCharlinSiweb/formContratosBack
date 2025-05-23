import { Router } from 'express';
import { sendContact } from '../controllers/sendContactController';

const router = Router();

// Rutas CRUD
router.post('/send-contact', sendContact);

export default router;