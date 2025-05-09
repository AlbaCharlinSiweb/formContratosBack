import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contractRoutes from './routes/contractRoutes';

dotenv.config();

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
}); 