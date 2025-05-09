# Backend Kit Digital

Backend para el proyecto Kit Digital de Siweb Canarias.

## Comandos de ejecucion

- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática
- `npm run build`: Compila el proyecto TypeScript y copia el archivo .env a la carpeta dist
- `npm start`: Inicia el servidor en modo producción (primero realizar build)
- `npm test`: Ejecuta las pruebas (pendiente de implementar)

## Estructura del Proyecto

```
project_back/
├── src/
│   ├── controllers/    # Controladores de la lógica de negocio
│   ├── routes/         # Definición de rutas
│   ├── utils/          # Utilidades
│   └── app.ts         # Configuración
├── .env               # Variables de entorno (no incluido en el repositorio)
├── .env.example       # Ejemplo de variables de entorno
└── package.json       # Dependencias y scripts
```

## Endpoints

### POST /api/create-contract
Crea un nuevo contrato.

**Body:**
```json
{
  "tax_id": "string",
  "product": "string"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    // Datos del contrato creado
  }
}
```

## Desarrollo

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000` (o el puerto especificado en el archivo .env).

## Producción

Para compilar y ejecutar en producción:
```bash
npm run build
npm start
```
