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

---

## 🚀 Deployment Instructions (Step-by-Step)

### Repository Information
- **GitHub URL**: https://github.com/jmangarret19/control-gastos-ia
- **Status**: ✅ Code pushed to main branch

### 1️⃣ Neon PostgreSQL Setup

**Platform**: https://console.neon.tech

**Steps**:
1. Create account / Login
2. Click **"New Project"**
3. Project Name: `control-gastos-db`
4. Region: Select closest (e.g., US East - Ohio)
5. Click **"Create Project"**
6. **Copy Connection String** (format):
   ```
   postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require
   ```
7. ⚠️ Save this for Render configuration

**Free Tier**: 0.5GB storage, 3GB transfer/month

---

### 2️⃣ Render Backend Deployment

**Platform**: https://dashboard.render.com

**Steps**:
1. Create account / Login
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub account
4. Select repository: `control-gastos-ia`
5. Configuration:
   - **Name**: `control-gastos-api`
   - **Region**: Oregon (Free)
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Build Command**:
     ```bash
     cd apps/api && npm install && npx prisma generate && npm run build
     ```
   - **Start Command**:
     ```bash
     cd apps/api && npx prisma db push && npm start
     ```

6. **Environment Variables** (click "Advanced"):
   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | Neon connection string with `?sslmode=require` |
   | `JWT_SECRET` | Random string (use: `openssl rand -base64 32`) |
   | `NODE_ENV` | `production` |

7. Select **Free** plan
8. Click **"Create Web Service"**
9. ⏳ Wait 3-5 minutes for deployment
10. **Copy Backend URL** (e.g., `https://control-gastos-api.onrender.com`)

**Free Tier**: Spins down after 15 min inactivity, auto-deploys on git push

---

### 3️⃣ Vercel Frontend Deployment

**Platform**: https://vercel.com/new

**Steps**:
1. Login with GitHub
2. Click **"Import Project"**
3. Select: `control-gastos-ia`
4. Click **"Import"**
5. Configuration:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)

6. **Environment Variables**:
   - Click "Environment Variables"
   - Add:
     | Name | Value |
     |------|-------|
     | `VITE_API_URL` | Backend URL from Step 2 (Render) |

7. Click **"Deploy"**
8. ⏳ Wait 1-2 minutes
9. **Copy Frontend URL** (e.g., `https://control-gastos-ia.vercel.app`)

**Free Tier**: 100GB bandwidth/month, auto-deploys on git push

---

### 4️⃣ Verification Checklist

Once deployed, test:
- [ ] Open Vercel URL
- [ ] Register new account
- [ ] Login with credentials
- [ ] Add expense
- [ ] View expense in list
- [ ] Delete expense
- [ ] Test all 6 themes (Light, Dark, Midnight, Forest, Sunset, Ocean)
- [ ] Switch language (ES ↔ EN)
- [ ] Check dashboard totals
- [ ] Logout and login again

---

### 🔧 Troubleshooting

**Backend Issues**:
- Check Render logs for errors
- Verify `DATABASE_URL` format includes `?sslmode=require`
- Ensure migrations ran (look for `prisma migrate deploy` in logs)

**Frontend Issues**:
- Verify `VITE_API_URL` in Vercel dashboard
- Check browser console for CORS errors
- Ensure backend URL doesn't end with `/`

**Database Issues**:
- **Error `table public.User does not exist`**: Change Start Command to `npx prisma db push`.
- Confirm Neon project is active
- Check connection string permissions (SSL mode required)
- Verify PostgreSQL version compatibility

---

### 📝 Deployment URLs Summary

| Service | URL | Status |
|---------|-----|--------|
| **GitHub** | https://github.com/jmangarret19/control-gastos-ia | ✅ Active |
| **Frontend (Vercel)** | https://control-gastos-ia.vercel.app | ✅ Active |
| **Backend (Render)** | https://control-gastos-ia.onrender.com | ✅ Active |
| **Database (Neon)** | https://console.neon.tech (PostgreSQL) | ✅ Active |


---

---

### 🔄 Future Updates

After initial deployment, updates are automatic:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Both Vercel and Render will auto-deploy changes from `main` branch.

---

## 🚀 Future Roadmap

### 📊 Phase 4: Data & Analytics
- **Visualización de Datos**: Gráficos de torta y barras (Recharts) para gastos por categoría.
- **Categorías & Etiquetas**: Clasificación personalizada con iconos y colores.

### 🎯 Phase 5: Personal Finance Tools
- **Presupuestos (Budgets)**: Establecer límites mensuales y alertas de consumo.
- **Gastos Recurrentes**: Automatización de suscripciones y facturas fijas.

### 📄 Phase 6: Reporting & Utility
- **Exportación de Datos**: Descarga de reportes en CSV y PDF.
- **Búsqueda Avanzada**: Filtros potentes por rango de fechas y descripción.
- **Adjuntar Recibos**: Subida de imágenes de comprobantes.

---

### 📱 Phase 7: Mobile Integration (Capacitor)
- **Status**: Completado ✅ 
- **Android**: Configuración nativa añadida y workflow CI de GitHub Actions listo para generar `.apk`.
- **iOS**: Configuración base de Capacitor lista, compilación de GitHub Actions automatizada.
