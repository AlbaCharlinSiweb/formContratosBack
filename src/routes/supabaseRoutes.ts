import { Router } from 'express';
import { createRecord } from '../controllers/supabaseController';

const router = Router();

// Rutas CRUD
router.post('/create-contact', createRecord);

export default router; 