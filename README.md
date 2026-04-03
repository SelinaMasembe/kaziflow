# KaziFlow - Task Management Application

A full-stack task management application built with **FastAPI** (backend) and **React** (frontend). KaziFlow allows users to create, read, update, and delete tasks with a beautiful, modern UI featuring dark mode and real-time synchronization.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Database Configuration](#database-configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

KaziFlow is a task management system designed for productivity. Users can:

- Create tasks with titles and descriptions
- Mark tasks as completed
- Edit existing tasks inline
- Delete tasks
- View real-time progress (X of Y tasks completed)

The application features a responsive, high-contrast dark UI with smooth animations and intuitive interactions.

## Tech Stack

### Backend

- **Framework**: FastAPI (Python web framework)
- **Database**: SQLite (local) / PostgreSQL (production)
- **ORM**: SQLAlchemy
- **Server**: Uvicorn (ASGI server)
- **Data Validation**: Pydantic

### Frontend

- **Framework**: React 18+
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS-in-JS (inline styles with modern color palette)

## Project Structure

```
kaziflow/
├── backend/
│   ├── venv/                    # Python virtual environment
│   ├── main.py                  # FastAPI application entry point
│   ├── models.py                # SQLAlchemy ORM models
│   ├── schemas.py               # Pydantic request/response schemas
│   ├── crud.py                  # Database CRUD operations
│   ├── database.py              # Database connection configuration
│   ├── requirements.txt         # Python dependencies
│   ├── .env                     # Environment variables (local)
│   ├── Procfile                 # Deployment configuration
│   └── kaziflow.db              # SQLite database (local development)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main React component
│   │   ├── main.jsx             # React entry point
│   │   ├── App.css              # Component styles
│   │   ├── index.css            # Global styles
│   │   └── assets/              # Images and icons
│   ├── public/                  # Static assets
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   ├── package.json             # npm dependencies
│   ├── .env.production          # Production environment variables
│   └── eslint.config.js         # Linter configuration
│
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## Backend Setup

### Prerequisites

- Python 3.8+ (tested with 3.14)
- pip (Python package manager)

### Installation

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file** (already created):

   ```bash
   cat > .env << 'EOF'
   DATABASE_URL=sqlite:///./kaziflow.db
   EOF
   ```

5. **Run the backend**:

   ```bash
   uvicorn main:app --reload
   ```

   - API will be available at `http://localhost:8000`
   - Interactive API docs at `http://localhost:8000/docs`

### Backend Dependencies

Key packages installed (see `requirements.txt`):

- `fastapi==0.135.3` - Web framework
- `uvicorn==0.42.0` - ASGI server
- `sqlalchemy==2.0.48` - ORM
- `psycopg2-binary==2.9.11` - PostgreSQL adapter
- `python-dotenv==1.2.2` - Environment variable management
- `pydantic==2.12.5` - Data validation

### Database Models

**Task Model** (`models.py`):

```python
class Task(Base):
    __tablename__ = "tasks"
    
    id: int (Primary Key)
    title: str (Required, max 255 chars)
    description: str (Optional)
    completed: bool (Default: False)
    created_at: datetime
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check - returns API status |
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Create a new task |
| GET | `/tasks/{task_id}` | Get a specific task |
| PUT | `/tasks/{task_id}` | Update a task |
| DELETE | `/tasks/{task_id}` | Delete a task |

#### Request/Response Examples

**Create Task (POST /tasks)**:

```json
Request Body:
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}

Response (200):
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

**Update Task (PUT /tasks/{id})**:

```json
Request Body:
{
  "title": "Buy organic groceries",
  "description": "Organic milk, free-range eggs, wholemeal bread",
  "completed": false
}

Response (200): [Updated task object]
```

---

## Frontend Setup

### Prerequisites

- Node.js 16+ (with npm)
- npm 7+

### Installation

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create `.env.production` file** (optional, for production):

   ```bash
   echo "VITE_API_URL=https://your-backend-url.com" > .env.production
   ```

4. **Run development server**:

   ```bash
   npm run dev
   ```

   - App will be available at `http://localhost:5173`
   - Vite provides HMR (Hot Module Replacement) for instant updates

5. **Build for production**:

   ```bash
   npm run build
   ```

   - Creates optimized production bundle in `dist/` directory

### Frontend Features

#### UI/UX

- **Dark Mode**: Modern dark theme with high contrast (#0f172a to #1e293b gradient)
- **Color Palette**:
  - Primary: Emerald Green (#10b981) for CTAs
  - Text: Light (#f1f5f9) on dark backgrounds
  - Accent: Red (#ff6b6b) for delete actions
  - Borders: Slate (#334155)

#### Interactions

- ✅ Create tasks (Enter key or button click)
- ✅ Mark completed (checkbox with smooth animation)
- ✅ Inline editing (click task to edit, Save/Cancel buttons)
- ✅ Delete tasks (red × button)
- ✅ Progress counter (X of Y completed)
- ✅ Smooth animations (slideIn, hover effects)
- ✅ Responsive design (mobile-friendly)

#### State Management

- React Hooks (useState, useEffect)
- Local state for tasks, form inputs, and edit mode
- Axios for API calls with error handling

---

## Running Locally

### Full Stack Setup

1. **Backend Terminal**:

   ```bash
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload
   # Backend running on http://localhost:8000
   ```

2. **Frontend Terminal** (in new terminal):

   ```bash
   cd frontend
   npm run dev
   # Frontend running on http://localhost:5173
   ```

3. **Access the app**:
   - Open `http://localhost:5173` in your browser
   - The frontend will automatically communicate with the backend at `http://localhost:8000`

### Testing the API

Use the interactive API documentation:

- Visit `http://localhost:8000/docs` (Swagger UI)
- Or visit `http://localhost:8000/redoc` (ReDoc)

---

## 📚 API Documentation

All endpoints return JSON responses. The backend uses Pydantic for automatic validation and documentation.

### Error Responses

**404 Not Found**:

```json
{
  "detail": "Task not found"
}
```

**422 Validation Error**:

```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## Features

### Current Features

- ✅ Full CRUD operations for tasks
- ✅ Task completion tracking
- ✅ Inline task editing (title + description)
- ✅ Real-time UI updates
- ✅ Responsive design
- ✅ Beautiful dark UI with high contrast
- ✅ Smooth animations and transitions
- ✅ Error handling and validation

### Planned Features

- 🔜 User authentication & authorization
- 🔜 Task categories/projects
- 🔜 Due dates and reminders
- 🔜 Task priority levels
- 🔜 Dark/Light theme toggle
- 🔜 Export tasks to CSV/PDF
- 🔜 Collaborative task sharing

---

## Database Configuration

### Local Development (SQLite)

Default configuration uses SQLite for simplicity:

```
DATABASE_URL=sqlite:///./kaziflow.db
```

**Pros**: No setup required, file-based, great for development
**Cons**: Not suitable for production, limited concurrency

### Production (PostgreSQL on Railway)

1. **Set up PostgreSQL on Railway**:
   - Create a new Railway project
   - Add PostgreSQL plugin
   - Copy the connection string

2. **Update `backend/.env`**:

   ```
   DATABASE_URL=postgresql://user:password@host:port/dbname
   ```

3. **Install PostgreSQL driver** (if not already installed):

   ```bash
   pip install psycopg2-binary
   pip freeze > requirements.txt
   ```

4. **The database.py file automatically handles the connection**:
   - Detects database type from URL
   - Applies appropriate configurations
   - No code changes needed

---

## Deployment

### Deploy Frontend (Vercel/Netlify/Railway)

1. **Build the app**:

   ```bash
   npm run build
   ```

2. **Deploy `dist/` folder** to your hosting platform

3. **Set environment variable**:

   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Deploy Backend (Railway/Heroku/Render)

1. **Ensure `requirements.txt` is updated**:

   ```bash
   pip freeze > requirements.txt
   ```

2. **Create `Procfile`** (already exists):

   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

3. **Set environment variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `ALLOWED_ORIGINS`: Frontend URLs (for CORS)

4. **Push to Git and deploy** via Railway/Heroku

### Environment Variables Checklist

**Backend (.env or Railway)**:

- ✅ `DATABASE_URL` - Database connection string
- ✅ `ALLOWED_ORIGINS` - Frontend URL (default: `*`)

**Frontend (.env.production)**:

- ✅ `VITE_API_URL` - Backend URL (default: `http://localhost:8000`)

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use**:

```bash
uvicorn main:app --reload --port 8001
```

**Module not found (database, models, etc.)**:

```bash
# Ensure you're in the backend directory with venv activated
which python  # Should show venv/bin/python
```

**Database errors**:

```bash
# Reset SQLite database
rm kaziflow.db
uvicorn main:app --reload  # Will recreate
```

### Frontend Issues

**`Cannot find module 'axios'`**:

```bash
npm install axios
```

**Port 5173 already in use**:

```bash
npm run dev -- --port 5174
```

**API calls returning CORS errors**:

- Ensure backend is running
- Check `ALLOWED_ORIGINS` in backend
- Verify `API` URL in App.jsx matches backend URL

### General Issues

**Git venv tracked unintentionally**:

```bash
git rm -r --cached backend/venv/
git commit -m "Remove venv from tracking"
```

**Need to reinstall everything**:

```bash
# Backend
cd backend
rm -rf venv kaziflow.db
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Environment Variables Reference

### Backend (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite:///./kaziflow.db` | Database connection string |
| `ALLOWED_ORIGINS` | `*` | CORS allowed origins (comma-separated) |

### Frontend (.env.production)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Backend API URL |

---

## 📄 License

This project is provided as-is for educational purposes.

---

**Happy task managing!**
