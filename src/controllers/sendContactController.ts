import { Request, Response } from 'express';
import dotenv from 'dotenv';

import fetch, { Headers } from 'node-fetch';

dotenv.config();

interface SendContactPayload {
    nombre: string;
    telefono: string;
    cif: string;
    contract: string;
  }

interface CreateAndContractPayload extends SendContactPayload {
  address: string;
  city: string;
  province: string;
  zipcode: string;
  mail: string;
  campaign_id: string;
}

const API_CONFIG = {
  BASE_URL: process.env.BASE_URL_CONTACT || '',
  AUTH_TOKEN: process.env.AUTH_TOKEN_CONTACT || '',
  CREATE_CONTRACT_URL: process.env.BASE_URL_CREATE_CONTACT || ''
};

export const sendContact = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const payload: SendContactPayload = req.body;
    console.log('Payload enviado:', payload);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-api-token': API_CONFIG.AUTH_TOKEN
    });

    const response = await fetch(API_CONFIG.BASE_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    console.log('Respuesta del servidor:', responseData);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: responseData.message || 'Error en la respuesta del servidor',
        details: responseData
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contacto enviado correctamente',
      data: responseData
    });
  } catch (error) {
    console.error('Error al enviar el contacto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const createAndContract = async (req: Request, res: Response) => {
  try {
    const payload: CreateAndContractPayload = req.body;
    console.log('Payload enviado:', payload);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-api-token': API_CONFIG.AUTH_TOKEN
    });

    const response = await fetch(API_CONFIG.CREATE_CONTRACT_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    console.log('Respuesta del servidor:', responseData);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: responseData.message || 'Error en la respuesta del servidor',
        details: responseData
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contrato creado correctamente',
      data: responseData
    });
  } catch (error) {
    console.error('Error al crear y contratar:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
