import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contractRoutes from './routes/contractRoutes';
// Cargar variables de entorno antes de cualquier otra importación
const result = dotenv.config();

if (result.error) {
    console.error('Error cargando .env:', result.error);
    process.exit(1);
}

console.log('Archivo .env cargado correctamente');
console.log('Directorio actual:', process.cwd());

import supabaseRoutes from './routes/supabaseRoutes';
//import sendContactRoutes from './routes/sendContactRoutes';

const app = express();
const allowedOrigins = [
    'https://kitdigital.siwebcanarias.es',
    'https://clientes.siweb.es',
    'https://clientes.siwebcanarias.es'
];

// Configuración de CORS
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origen no permitido por CORS'));
        }
    },
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
app.use('/api', supabaseRoutes);
//app.use('/api', sendContactRoutes);

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