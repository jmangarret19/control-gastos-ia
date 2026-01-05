# Plan de Implementación - Aplicación de Gastos (Monorepo)

## Descripción General
Crear una aplicación Full Stack (Monorepo) para el registro de gastos.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, SQLite (Dev), Clean Architecture.
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Diseño Responsivo.
- **Infraestructura**: Docker, GitHub Actions CI.

## Estructura del Proyecto
```
/ (root)
  /apps
    /api (Backend)
    /web (Frontend)
  /packages (Optional shared types if needed)
  docker-compose.yml
  .github/workflows/ci.yml
```

## User Review Required
> [!NOte]
> Para desarrollo local se usará SQLite por simplicidad. Para producción, Prisma facilita el cambio a PostgreSQL/MySQL modificando `schema.prisma`.

## Proposed Changes

### Root
#### [NEW] package.json
Configuración del workspace npm/pnpm.

### Backend (`apps/api`)
#### [NEW] Estructura Clean Architecture
- `src/domain`: Entidades e interfaces.
- `src/application`: Casos de uso / Servicios logic.
- `src/infrastructure`: Implementación de DB (Prisma), Servidor Web (Express), Controladores.
- `prisma/schema.prisma`: Defines `User` and `Expense` models.

### Frontend (`apps/web`)
#### [NEW] Setup Vite React
- Configuración de Tailwind CSS.
- Componentes UI responsivos.
- Páginas: Login, Registro, Dashboard.

### DevOps
#### [NEW] Dockerfiles
- `apps/api/Dockerfile`
- `apps/web/Dockerfile`
#### [NEW] GitHub Actions
- `.github/workflows/ci.yml`: Build y Test.

## Frontend Enhancements Plan
### Internationalization (i18n)
- **Library**: `react-i18next` + `i18next`.
- **Structure**: `src/i18n` for config and locales (`es.json`, `en.json`).
- **Default**: Spanish ('es').

### Theming (Dark/Light)
- **Strategy**: Tailwind `darkMode: 'class'`.
- **Context**: `ThemeContext` to manage state and local storage persistence.
- **UI Updates**:
    - Inputs: Add borders, focus rings (primary color).
    - Colors: Define semantic colors in Tailwind config if needed, or use standard palette ensuring contrast.

## Verification Plan

### Automated Tests
- Ejecutar linter y builds de ambos proyectos.
- GitHub Actions simulará el proceso de CI.

### Manual Verification
- Iniciar `docker-compose up`.
- Registrar un usuario.
- Crear, editar y listar gastos.
- Verificar vista móvil en el navegador.
