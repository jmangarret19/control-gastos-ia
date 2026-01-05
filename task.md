# Task Checklist - Expense Tracker App

## Initialization
- [x] Initialize Monorepo Structure (`apps/api`, `apps/web`)
- [x] Configure Top-level `package.json` and tooling

## Backend (API)
- [x] Initialize `apps/api` (Node, TypeScript, Express)
- [x] Setup Prisma ORM & Database Schema (SQLite)
- [x] Implement Clean Architecture Structure
- [x] Implement Authentication (Register/Login, JWT)
- [x] Implement Expenses CRUD
- [x] Add Dockerfile for API

## Frontend (Web)
- [x] Initialize `apps/web` (Vite, React, TypeScript)
- [x] Setup Tailwind CSS & Design System
- [x] Implement API Client & Auth Context
- [x] Create Auth Pages (Login/Register)
- [x] Create Dashboard & Expense Management UI
- [x] Add Dockerfile for Web

## DevOps & Finalization
- [x] Create `docker-compose.yml` for local development
- [x] Create GitHub Actions CI workflow
- [x] Verification & Manual Testing Guide

## Frontend Enhancements (i18n & Theming)
- [x] Install & Configure i18n (react-i18next)
- [x] Implement Translation Files (ES/EN)
- [x] Implement Theme Context & 6 Themes
- [x] Enhance UI Components (Inputs, Buttons, Colors)

## Fixes & New Features
- [x] Debug & Fix Light Mode Issue
- [x] Implement Dashboard Summary (Totals)
- [x] Add Theme Selector UI

## Production Deployment
- [x] Migrate from SQLite to PostgreSQL
- [x] Create deployment configuration files
- [x] Setup GitHub repository
- [x] Configure Vercel (Frontend)
- [x] Configure Render (Backend)
- [x] Setup Neon PostgreSQL
- [x] Create deployment documentation

---

## 🚀 Future Roadmap (Suggested Features)

### 1. 📊 Visualización de Datos
Implementar gráficos interactivos (Recharts o Chart.js) para visualizar:
- Gasto por categoría.
- Tendencia de gastos mensual.
- Comparativa de meses.

### 2. 🏷️ Categorías y Etiquetas
- Permitir al usuario crear categorías personalizadas.
- Asignar iconos y colores a cada categoría.
- Filtrar la lista de gastos por etiquetas.

### 3. 🎯 Presupuestos (Budgets)
- Establecer un presupuesto máximo por mes o por categoría.
- Barra de progreso que muestre cuánto del presupuesto se ha consumido.
- Notificaciones cuando se supere el 80% o 100% del presupuesto.

### 4. 📄 Exportación de Datos
- Botón para exportar todos los registros a un archivo **CSV** (Excel).
- Generación de reportes mensuales en **PDF** con gráficos.

### 5. 🔁 Gastos Recurrentes
- Crear gastos que se repitan automáticamente cada semana o mes (ej: Alquiler, Netlix).
- Marcador de "Pendiente" o "Pagado" para estos gastos.

### 6. 📸 Recibos y Archivos
- Poder subir una foto del ticket o recibo al crear un gasto.
- Integración con servicios de almacenamiento (Cloudinary o Firebase Storage).

### 7. 🔍 Búsqueda y Filtros Avanzados
- Buscador por texto en la descripción.
- Filtro por rango de fechas exacto.
- Ordenamiento por precio (mayor/menor).
