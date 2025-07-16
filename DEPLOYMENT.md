# Deployment Instructions

## Prerequisites
- Node.js 16+ installed
- MySQL database (local or cloud)
- Git repository

## Frontend Deployment (Vercel)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via GitHub**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import your repository
   - Configure build settings:
     - Framework: Create React App
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`

## Backend Deployment (Railway)

1. **Go to [railway.app](https://railway.app)**
2. **Connect GitHub repository**
3. **Configure settings**:
   - Root Directory: `backend`
   - Start Command: `npm start`
   - Add environment variables

## Database Options

### Option A: Use Existing Remote Database
- Keep your current connection in `.env`

### Option B: Railway MySQL
1. Add MySQL service in Railway
2. Copy connection details to environment variables

### Option C: PlanetScale (Recommended)
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Update environment variables

## Environment Variables

Add these to your deployment platform:

### Backend (.env):
```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=5000
```

### Frontend:
```
REACT_APP_HOST_URL=https://your-backend-url.railway.app
```
