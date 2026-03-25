# 💰 Expense Tracker

A full-stack expense tracking application with multi-theme support and internationalization (i18n).

## 🚀 Live Demo

- **Frontend**: [https://control-gastos-ia.vercel.app](https://control-gastos-ia.vercel.app)
- **Backend API**: [https://control-gastos-ia.onrender.com/api](https://control-gastos-ia.onrender.com/api)
- **Repo**: [https://github.com/jmangarret19/control-gastos-ia](https://github.com/jmangarret19/control-gastos-ia)

## ✨ Features

- 📊 **Expense Management**: Create, view, and delete expenses
- 🎨 **6 Beautiful Themes**: Light, Dark, Midnight, Forest, Sunset, Ocean
- 🌍 **Multi-language**: Spanish and English support
- 🔐 **Authentication**: Secure JWT-based auth
- 📱 **Responsive Design**: Works on all devices
- 💾 **Dashboard Summary**: Track total expenses and amounts

## 🛠️ Tech Stack

### Frontend
- **React** with **TypeScript**  
- **Vite** for blazing-fast builds
- **Tailwind CSS** with CSS Variables for theming
- **React Router** for navigation
- **i18next** for internationalization
- **Axios** for API requests

### Backend
- **Node.js** with **Express**
- **TypeScript** for type safety
- **Prisma ORM** with **PostgreSQL**
- **JWT** for authentication
- **bcryptjs** for password hashing

### DevOps
- **Docker** support
- **GitHub Actions** CI/CD
- **Vercel** (Frontend deployment)
- **Render** (Backend deployment)
- **Neon** (PostgreSQL database)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jmangarret19/control-gastos-ia.git
   cd control-gastos-ia
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Database (Local)**:
   By default, the project is configured for **PostgreSQL** (Production). For local development with **SQLite**:
   - Open `apps/api/prisma/schema.prisma`
   - Change `provider = "postgresql"` to `provider = "sqlite"`
   - Update `apps/api/.env`:
     ```env
     DATABASE_URL="file:./dev.db"
     JWT_SECRET="your-secret-key"
     PORT=3000
     NODE_ENV="development"
     ```
   - Update `apps/web/.env`:
     ```env
     VITE_API_URL=http://localhost:3000
     ```

4. **Initialize database**:
   ```bash
   cd apps/api
   npx prisma migrate dev --name init
   npx prisma generate
   cd ../..
   ```

5. **Start development servers**:
   
   Terminal 1 (Backend):
   ```bash
   cd apps/api
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd apps/web
   npm run dev
   ```

6. **Open the app**: Visit `http://localhost:5173`

## 🎨 Themes

Choose from 6 carefully crafted themes:

| Theme      | Description                    |
|------------|--------------------------------|
| Light      | Clean white/gray palette       |
| Dark       | Modern dark gray               |
| Midnight   | Deep blue slate tones          |
| Forest     | Soft green and earth tones     |
| Sunset     | Warm orange and cream          |
| Ocean      | Refreshing cyan and aqua       |

## 🌐 Internationalization

Switch between languages on the fly:
- 🇪🇸 Spanish (default)
- 🇬🇧 English

## 📦 Project Structure

```
expense-tracker/
├── apps/
│   ├── api/              # Backend (Express + Prisma)
│   │   ├── src/
│   │   ├── prisma/
│   │   └── package.json
│   └── web/              # Frontend (React + Vite)
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   ├── services/
│       │   └── i18n/
│       └── package.json
├── vercel.json           # Vercel config
├── render.yaml           # Render config
└── DEPLOYMENT.md         # Deployment guide
```

## 🌍 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. **Database (Neon)**: 
   - Create a PostgreSQL database at [neon.tech](https://neon.tech).
   - Copy the connection string (with `?sslmode=require`).

2. **Backend (Render)**: 
   - Deploy as a **Web Service**.
   - Use `render.yaml` (Blueprint) or manual config:
     - **Build**: `cd apps/api && npm install && npx prisma generate && npm run build`
     - **Start**: `cd apps/api && npx prisma db push && npm start`
     - **Env**: `DATABASE_URL` (Neon), `JWT_SECRET`, `NODE_ENV=production`.

3. **Frontend (Vercel)**: 
   - Deploy with **Vite** preset.
   - **Root Directory**: `apps/web`.
   - **Env**: `VITE_API_URL` (pointing to your Render API URL + `/api`).

See [DEPLOYMENT.md](./DEPLOYMENT.md) for a full guide.

## 🧪 Testing

```bash
# Run frontend build
cd apps/web
npm run build

# Run backend build
cd apps/api
npm run build
```

## 📝 Environment Variables

The application requires different environment variables depending on the environment.

### 🏠 Local Development
Configured in `.env` files within each app folder.

**Backend** (`apps/api/.env`):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-local-secret-key"
PORT=3000
NODE_ENV="development"
```

**Frontend** (`apps/web/.env`):
```env
VITE_API_URL="http://localhost:3000"
```

### 🌍 Production (Cloud)
Set these in the **Render** and **Vercel** dashboards.

**Backend (Render Settings)**:
```env
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.neon.tech/neondb?sslmode=require"
JWT_SECRET="your-secure-production-random-string"
NODE_ENV="production"
```

**Frontend (Vercel Settings)**:
```env
VITE_API_URL="https://your-api-name.onrender.com/api"
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Inspired by real-world expense tracking needs
- Designed with user experience in mind

---

## 📱 Mobile Supported (Capacitor)
This project is fully ready for mobile using **Capacitor**.
- **Android**: APKs are automatically generated using GitHub Actions.
- **iOS**: Ready for Xcode compilation.
See [DEPLOYMENT.md](./DEPLOYMENT.md) for mobile build details.

---

**Made by jmangarret19** | [GitHub Repo](https://github.com/jmangarret19/control-gastos-ia)
