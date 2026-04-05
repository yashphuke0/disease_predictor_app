# Quick Start Guide

## Backend API Approach

This guide will help you get the app running in 5 minutes!

### Step 1: Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Or (Windows CMD)
venv\Scripts\activate.bat
```

You should see `(venv)` in your terminal prompt.

### Step 2: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend (make sure venv is activated):**
```bash
pip install -r requirements.txt
```

### Step 3: Verify Model File

Make sure `public/best_HCNN.h5` exists.

### Step 4: Start Backend (Terminal 1)

**Important:** Make sure your virtual environment is activated (you should see `(venv)` in prompt)

```bash
python backend_api_example.py
```

Wait until you see:
```
Model loaded successfully!
Starting server on http://localhost:5000
```

### Step 5: Start Frontend (Terminal 2)

```bash
npm run dev
```

### Step 6: Open Browser

Navigate to the URL shown (usually `http://localhost:5173`)

### Step 7: Test the App

1. Click "Start Scan"
2. Upload a tomato leaf image
3. See the prediction!

## Troubleshooting

**Backend won't start?**
- Check if `best_HCNN.h5` is in `public/` folder
- Verify Python dependencies: `pip list | grep tensorflow`

**Frontend can't connect?**
- Make sure backend is running first
- Check backend is on port 5000
- Refresh the browser page

**Still having issues?**
- Check the full README.md for detailed troubleshooting
- Look at browser console (F12) for errors
- Check backend terminal for error messages

## That's it! 🎉

Your app should now be running and ready to predict tomato diseases!

