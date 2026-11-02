# Práctica Dokploy — Universidad del Quindío

Aplicación Express.js usada como aplicación de prueba para la práctica de
**Administración de Contenedores con Dokploy** del curso *Administración de
Infraestructura de TI* de la Universidad del Quindío.

- **Autora:** Luisa Fernanda Osorio Giraldo
- **Repositorio:** <https://github.com/LuisaFeOsorio/dokploy-practica>
- **Versión desplegada:** 2.0.0
- **Plataforma:** Dokploy v0.30.10 sobre Docker Swarm + Traefik v3.6.25

## Endpoints

| Ruta | Descripción |
|------|-------------|
| `/` | Datos generales de la práctica y versión desplegada |
| `/health` | Estado del contenedor, uptime, versión de la app y de Node |
| `/info` | Sistema operativo, arquitectura y memoria del contenedor |
| `/db` | Comprueba la conexión con MySQL creado en Dokploy |

## Estructura del repositorio

```
.
├── Dockerfile          # Imagen de producción (Node.js 20)
├── docker-compose.yml  # Stack multi-servicio de la Fase 5
├── .env.example        # Plantilla de variables (sin credenciales reales)
├── package.json
└── src/
    └── index.js        # Aplicación Express.js
```

## Ejecución local

```bash
npm install
npm start
```

La aplicación escucha en el puerto indicado por `PORT` (3000 por defecto).

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar los valores:

```bash
cp .env.example .env
```

| Variable | Descripción |
|----------|-------------|
| `NODE_ENV` | Entorno de ejecución (`production`) |
| `PORT` | Puerto de la aplicación (3000) |
| `APP_NAME` | Nombre visible de la aplicación |
| `APP_VERSION` | Versión desplegada (2.0.0) |
| `DB_HOST` | Servicio MySQL en Docker Swarm |
| `DB_PORT` | Puerto de MySQL (3306) |
| `DB_NAME` | Nombre de la base de datos |
| `DB_USER` | Usuario de la base de datos |
| `DB_PASSWORD` | Contraseña de la base de datos |

`.env` está en `.gitignore`: las credenciales reales no se publican en el
repositorio.

## Docker

```bash
docker build -t uni-quindio-app .
docker run -p 3000:3000 --env-file .env uni-quindio-app
```

## Docker Compose (Fase 5)

El archivo `docker-compose.yml` levanta la aplicación, MongoDB, MySQL y
phpMyAdmin en una red interna:

```bash
docker compose up -d
docker compose ps
```

| Servicio | Puerto publicado | Descripción |
|----------|------------------|-------------|
| `app` | 3001 → 3000 | Aplicación Node.js |
| `phpmyadmin` | 8080 → 80 | Administración de MySQL |
| `db-service` | interno 3306 | MySQL 8.0 |
| `mongodb` | interno 27017 | MongoDB 7 |

## Despliegue en Dokploy

1. Crear el proyecto `uni-quindio` y la aplicación `webapp-uni-quindio`.
2. Conectar este repositorio, rama `main`, build type **Dockerfile**.
3. Configurar el puerto interno `3000` y las variables de `.env.example`.
4. En **Domains**, agregar el host público de la aplicación.
5. Desplegar y verificar `/`, `/health`, `/info` y `/db`.

## URLs de la práctica

| Recurso | URL / host |
|---------|------------|
| Aplicación (Traefik local) | <http://uni-quindio.127.0.0.1.traefik.me> |
| Panel de Dokploy | <http://127.0.0.1:3000> |
| Aplicación (URL pública temporal) | <https://cult-bloggers-vocabulary-copper.trycloudflare.com> |
| MySQL (sin credenciales) | `mysql://uniquindio-dbuniquindio-bhj0j9:3306/uni_quindio_db` |
| PostgreSQL (sin credenciales) | `postgresql://uniquindio-dbpostgresquindio-az9wif:5432/analytics_db` |
| Redis (sin credenciales) | `redis://uniquindio-rediscachequindio-gwo8pn:6379` |

> La URL de `trycloudflare.com` es un túnel temporal de demostración: solo
> funciona mientras el equipo que ejecuta Dokploy esté encendido y cambia al
> reiniciar el túnel. Para un despliegue permanente se usa un VPS con IP
> pública y un host `sslip.io` o un dominio propio.

## Fases de la práctica cubiertas

| Fase | Tema | Evidencia |
|------|------|-----------|
| 1 | Instalación y verificación del servidor | Panel de Dokploy accesible |
| 2 | Exploración de la interfaz | Proyecto `uni-quindio` creado |
| 3 | Despliegue desde Git | Aplicación accesible por URL |
| 4 | Bases de datos | MySQL, PostgreSQL y Redis |
| 5 | Docker Compose | Stack multi-servicio |
| 6 | Monitoreo, logs y backups | Silo + backups a S3 |
| 7 | Integración Git y CD | Push y despliegue de la v2.0.0 |
