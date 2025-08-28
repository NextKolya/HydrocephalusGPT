# 🧠 HydrocephalusGPT

Project <ins> without practical benefits</ins>, just [Gemini 2.5 Flash](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash) visual realization.

<a href="https://hgpt.netlify.app/" target="_blank">**Open project online**</a>

Frontend is deploying on &nbsp; [![netlify](https://img.shields.io/badge/-netlify-aqua?style=for-the-badge&logo=netlify&logoColor=black)](https://app.netlify.com/)

Backend is deploying on &nbsp;&nbsp; [![render.com](https://img.shields.io/badge/render.com-black)](https://render.com/)

### 📂 Project Structure

```bash
/HydrocephalusGPT
│── backend/              # Server (Node.js + Express.js)
    └── ai_api.js         # API server for AI
└── frontend/             # Client (Vite + React)
    │── public/           # Static files (fonts, images)
    └──src/
        │── components/   # React components
        │── hooks/        # Custom hooks
        └── ...Store.ts   # Zustand state stores
```

### ⚡️Stack

**Frontend:**
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-FF9900?style=flat&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)

**Backend:**
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

**AI API** &nbsp;&nbsp;&nbsp;&nbsp; [![Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=aquamarine)](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash)

### 🛠 Installing

```bash
git clone https://github.com/a-marigold/HydrocephalusGPT
cd HydrocephalusGPT
```

**Dependencies**

Frontend:

```
cd frontend
npm install
```

Backend:

```
cd backend
npm install
```

### ⚙️ Enviroment

```bash
backend/
└── .env                  # Enviroment for api key
```

```env
GEMINI_API_KEY = "your google api key here"
```

### 📦 Build

Frontend:

```bash
npm run build
npm run preview
```

Backend:

```bash
npm start
```
