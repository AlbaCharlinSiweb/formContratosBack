import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Interfaz para el tipo de usuario
interface User {
  name: string;
  cif: string;
  phone: string;
  option: string;
}

// Crear un nuevo registro
export const createRecord = async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;

    // Validación básica de campos requeridos
    if (!userData.name || !userData.cif || !userData.phone || !userData.option) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos: name, cif, phone, option' 
      });
    }

    const { data, error } = await supabase
      .from('new_users')
      .insert([userData])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};