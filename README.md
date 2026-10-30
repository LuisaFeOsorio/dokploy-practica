# Práctica Dokploy - Universidad del Quindío

Aplicación Express.js usada como aplicación de prueba para la práctica de
**Administración de Contenedores con Dokploy** del curso *Administración de
Infraestructura de TI*.

## Endpoints

| Ruta | Descripción |
|------|-------------|
| `/` | Datos generales de la práctica |
| `/health` | Estado del contenedor, uptime y versión de Node |
| `/info` | Información del sistema operativo y memoria del contenedor |
| `/db` | Comprueba la conexión con la base de datos MySQL creada en Dokploy |

## Ejecución local

```bash
npm install
npm start
```

La aplicación escucha en el puerto indicado por la variable `PORT` (3000 por
defecto).

## Despliegue

La aplicación se despliega desde Dokploy con **Nixpacks** (detección automática
de Node.js, versión 20) a partir de este repositorio Git.
