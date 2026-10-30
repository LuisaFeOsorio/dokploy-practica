const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        mensaje: '¡Aplicación desplegada con Dokploy!',
        institucion: 'Universidad del Quindío',
        programa: 'Ingeniería de Sistemas y Computación',
        curso: 'Administración de Infraestructura de TI',
        plataforma: 'Dokploy PaaS',
        fecha: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        estado: 'saludable',
        uptime: process.uptime(),
        version: process.version,
        plataforma: 'Dokploy'
    });
});

app.get('/info', (req, res) => {
    res.json({
        node_version: process.version,
        platform: process.platform,
        arch: process.arch,
        memory: {
            total: Math.round(require('os').totalmem() / 1024 / 1024) + ' MB',
            free: Math.round(require('os').freemem() / 1024 / 1024) + ' MB'
        }
    });
});

// Endpoint adicional de la práctica: comprueba la conexión con MySQL
app.get('/db', async (req, res) => {
    if (!process.env.DB_HOST) {
        return res.status(503).json({
            estado: 'sin configurar',
            detalle: 'Defina DB_HOST, DB_PORT, DB_NAME, DB_USER y DB_PASSWORD en Dokploy'
        });
    }

    try {
        const mysql = require('mysql2/promise');
        const conexion = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 3306),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectTimeout: 5000
        });

        const [filas] = await conexion.query('SELECT DATABASE() AS base, VERSION() AS version, NOW() AS ahora');
        await conexion.end();

        res.json({ estado: 'conectado', motor: 'MySQL', ...filas[0] });
    } catch (error) {
        res.status(500).json({ estado: 'error', detalle: error.message });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${port}`);
    console.log(`Plataforma: Dokploy PaaS`);
});
