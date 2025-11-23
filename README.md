# ERP Management System  
A full-stack Enterprise Resource Planning (ERP) system designed to manage operations, inventory, orders, finance, manufacturing, and staff workflows in a single platform.  

This application consists of a powerful **Node.js + Express + MongoDB backend** and an intuitive **React + TypeScript + Vite frontend**, with a clean modular architecture and production-ready build pipeline.

---

## 🚀 Tech Stack

### **Backend**
- **Node.js** (Runtime)
- **Express.js** (Server framework)
- **MongoDB + Mongoose** (Database & ORM)
- **JSON Web Tokens (JWT)** (Authentication)
- **Bcrypt** (Password hashing)
- **Cloudinary / AWS S3** (Media storage - optional)
- **Zod / Yup** (Validation)
- **Swagger / Postman Collection** (API documentation)
- **Nodemailer** (Email service)
- **PM2** (Production process manager)
- **Multer** (File uploads)

---

### **Frontend**
- **React 19**
- **TypeScript**
- **Vite** (Bundler & dev server)
- **React Router**
- **TailwindCSS**
- **ShadCN / Radix UI**
- **Zustand** (State management)
- **React Hook Form + Zod**
- **Axios**
- **pnpm** (Package manager)

---

## 📦 Prerequisites

Install the following before running the project:

- **Node.js 18+**
- **pnpm** → `npm install -g pnpm`
- **MongoDB 6+** (local or cloud)
- **Git**
- **VS Code** (recommended)

---

## 🛠️ Getting Started

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd erp-system
```
---
### 🗄️ Backend Setup
2. Install Backend Dependencies
```bash
Copy code
cd backend
pnpm install
```
---
### 3. Configure Environment Variables
Create a file:

```bash
Copy code
backend/.env
Add:

ini
Copy code
PORT=9090
MONGO_URI=mongodb://localhost:27017/erp
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.example.com
EMAIL_USER=your_email
EMAIL_PASS=your_password
CLOUDINARY_KEY=xxxx
CLOUDINARY_SECRET=xxxx
CLOUDINARY_CLOUD=xxxx
```
---
### 4. Start Backend (Development Mode)
``bash
Copy code
pnpm dev
Backend will run at:

arduino
Copy code
http://localhost:9090

---
### 5. API Documentation
Available at:

```bash
Copy code
http://localhost:9090/api-docs
```
---
### 🎨 Frontend Setup
6. Install Frontend Dependencies
```bash
Copy code
cd ../frontend
pnpm install
```
---
### 7. Create Frontend Environment File
Create:

```bash
Copy code
frontend/.env
Add:

ini
Copy code
VITE_API_BASE_URL=http://localhost:9090
```
---
### 8. Start Frontend in Dev Mode
```bash
Copy code
pnpm dev
Frontend will run at:

arduino
Copy code
http://localhost:5173
```
---
### 🧑‍💻 Development Workflow
Terminal	Command	Purpose
1	cd backend && pnpm dev	Start backend API
2	cd frontend && pnpm dev	Start React frontend

Both apps support hot-reload.

🏭 Production Build
Backend Production Build
bash
Copy code
cd backend
pnpm build
This creates an optimized production build.

Run:

bash
Copy code
pnpm start
Frontend Production Build
bash
Copy code
cd frontend
pnpm build
pnpm preview
🌐 Deploying (Backend + Frontend Together)
You can serve the React build from Express:

Build frontend:

bash
Copy code
cd frontend
pnpm build
Move build folder into backend:

arduino
Copy code
backend/public/
Add this in Express:

ts
Copy code
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});
Build backend:

bash
Copy code
pnpm build
pnpm start
Everything runs on one port in production.

📁 Project Structure
csharp
```bash
erp-system/
│
├── backend/                     # Node.js backend
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   ├── models/              # Mongoose models
│   │   ├── routes/              # API routes
│   │   ├── middlewares/         # Auth, validation, etc.
│   │   ├── services/            # Business logic
│   │   └── utils/               # Helper functions
│   ├── public/                  # Frontend build (production)
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── pages/               # Screens
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # API calls
│   │   ├── store/               # Zustand global state
│   │   └── types/               # TypeScript models
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md

```
---
### 🐞 Troubleshooting
Backend Not Starting
✔ MongoDB running?
✔ Correct .env values?
✔ Port 9090 free?
✔ Node version 18+?

Frontend Not Starting
✔ Delete node_modules
✔ Run pnpm install
✔ Ensure port 5173 free

CORS Issues
Check backend:

ts
Copy code
app.use(cors({ origin: "*", credentials: true }));
Build Fails
Run: pnpm build in frontend

Check TypeScript errors

Validate API URLs

🔐 Security Notes
Never commit .env files

Rotate JWT secrets regularly

Use HTTPS in production

Use environment variables for production DB

🤝 Contributing
Create a feature branch

Commit changes

Test backend + frontend

Submit pull request

📄 License
Choose a license for your project (MIT recommended).

📞 Support
For issues or suggestions, contact:
your-email@example.com

yaml
Copy code

---

If you want, I can also:

✅ Generate a **professional GitHub project banner**  
✅ Generate a **logo for your ERP system**  
✅ Create **API documentation file**  
✅ Write **CONTRIBUTING.md**  
✅ Create **folder badges / shields.io badges** for your README  

Just tell me!






