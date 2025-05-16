import { Request, Response } from 'express';
import { isValidSpanishId } from '../utils/validatorCif';
import dotenv from 'dotenv';

import fetch, { Headers } from 'node-fetch';

dotenv.config();

interface ContractPayload {
  tax_id: string;
  product: string;
  name: string;
  phone: string;
}

const API_CONFIG = {
  BASE_URL: process.env.BASE_URL || '',
  AUTH_TOKEN: process.env.X_AUTH_TOKEN || '',
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const payload: ContractPayload = req.body;

    // Validar el CIF/NIF
    if (!isValidSpanishId(payload.tax_id)) {
      return res.status(400).json({ error: 'CIF/NIF inválido' });
    }

    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': API_CONFIG.AUTH_TOKEN
    });

    console.error(headers);
    const response = await fetch(API_CONFIG.BASE_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        console.error('Error en la respuesta del servidor:', response);
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al crear el contrato:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 