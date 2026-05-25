# Study Platform

Aplicación web full-stack para registrar y gamificar sesiones de estudio. Los usuarios acumulan XP por materia, compiten en un leaderboard y visualizan su progreso con analíticas.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | FastAPI, SQLAlchemy, Pydantic v2 |
| Base de datos | PostgreSQL (via psycopg2) |
| Auth | JWT (access tokens) |

## Funcionalidades

- Registro e inicio de sesión con JWT
- Crear materias y registrar sesiones de estudio
- Sistema de XP y niveles por materia
- Leaderboard global de usuarios
- Dashboard con analíticas de tiempo y rendimiento
- API REST documentada automáticamente en `/docs`

## Estructura

```
study-platform/
├── backend/
│   └── app/
│       ├── core/        # config, seguridad, dependencias
│       ├── db/          # sesión y base SQLAlchemy
│       ├── models/      # User, Subject, StudySession
│       ├── routers/     # auth, users, subjects, sessions, leaderboard, analytics
│       ├── schemas/     # esquemas Pydantic
│       └── services/    # lógica de XP
└── frontend/
    ├── app/             # páginas y componentes Next.js
    ├── services/        # llamadas a la API
    ├── hooks/           # custom hooks
    └── types/           # tipos TypeScript
```

## Instalación

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Crea un archivo `.env` en `backend/`:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/study_platform
SECRET_KEY=tu_clave_secreta
```

```bash
uvicorn app.main:app --reload
```

La API estará disponible en `http://localhost:8000` y la documentación en `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:3000`.

## API — Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/users/me` | Perfil del usuario actual |
| GET/POST | `/api/subjects` | Listar / crear materias |
| GET/POST | `/api/study-sessions` | Listar / registrar sesiones |
| GET | `/api/leaderboard` | Ranking global |
| GET | `/api/analytics` | Estadísticas de estudio |
