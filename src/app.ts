import dotenv from 'dotenv';
// Cargar variables de entorno antes de cualquier otra importación
const result = dotenv.config();

if (result.error) {
  console.error('Error cargando .env:', result.error);
  process.exit(1);
}

console.log('Archivo .env cargado correctamente');
console.log('Directorio actual:', process.cwd());

import express from 'express';
import cors from 'cors';
import contractRoutes from './routes/contractRoutes';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://kitdigital.siwebcanarias.es', // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'X-AUTH-TOKEN'],
  credentials: true,
  maxAge: 86400 // 24 horas
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api', contractRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log('Variables de entorno cargadas:', {
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    X_AUTH_TOKEN: process.env.X_AUTH_TOKEN ? '***' : undefined
  });
}); 