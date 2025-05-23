import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface SendContactPayload {
    nombre: string;
    telefono: string;
    cif: string;
    contract: string;
  }

const API_CONFIG = {
  BASE_URL: process.env.BASE_URL_CONTACT || '',
  AUTH_TOKEN: process.env.AUTH_TOKEN_CONTACT || ''
};

export const sendContact = async (req: Request, res: Response) => {
  try {
    const payload: SendContactPayload = req.body;

    const headers = {
      'Content-Type': 'application/json',
      'x-api-token': API_CONFIG.AUTH_TOKEN
    };

    const response = await fetch(API_CONFIG.BASE_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Error en la respuesta del servidor:', response.status);
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al enviar el contacto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
