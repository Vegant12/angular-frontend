# Angular frontend

## Project overview

Single-page application for browsing foods, viewing details, managing a cart, placing orders, and basic admin flows. It is built with **Angular 21**, **Bootstrap 5**, and **Tailwind CSS** (PostCSS). The app talks to the Spring Boot backend over HTTP; services are configured for **`http://localhost:8080`** (REST base paths under `/api/v1/`). Ensure the backend is running and allows browser requests (CORS) when developing locally.

## Setup and installation

### Prerequisites

- **Node.js** (LTS recommended; aligns with npm used in this repo)  
- **npm** (see `packageManager` in `package.json` if you use Corepack)  

### Install dependencies

From this directory (`angular-frontend`):

```bash
npm install
```

## How to run the application

### Development server

```bash
npm start
```

This runs `ng serve`. By default the app is available at **`http://localhost:4200/`**. The dev server reloads when you change source files.

If port 4200 is busy, use another port:

```bash
npx ng serve --port 4300
```

### Admin Authentication

username: admin

password: admin123

### Production build

```bash
npm run build
```

Output is written under `dist/` (see `angular.json` for the exact project output path).


This runs the Angular/Vitest unit test setup configured for this project.

### Backend dependency

The UI expects the API at **port 8080**. Start the `springboot-backend` service first. If the backend URL or CORS setup differs in your environment, update the service `baseURL` values under `src/app/services/` to match.
