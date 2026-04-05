# Tomato Leaf Disease Predictor

A web application for predicting tomato leaf diseases using deep learning. Users can upload images of tomato leaves (from mobile or desktop) and get instant disease predictions with treatment recommendations.

## Features

- 📸 Upload tomato leaf images from camera or gallery
- 🤖 AI-powered disease prediction using trained CNN model
- 🌍 Multi-language support (English and Marathi)
- 📱 Mobile-responsive design
- 💊 Treatment and prevention recommendations for each disease

## Supported Diseases

1. Tomato Early blight leaf
2. Tomato Septoria leaf spot
3. Tomato Healthy Leaf
4. Tomato Leaf Bacterial Spot
5. Tomato Leaf Late Blight
6. Tomato Leaf Mosaic Virus
7. Tomato Leaf Yellow Virus
8. Tomato Mold Leaf
9. Tomato Spider Mite
10. Tomato Target Spot

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Python 3.7+ (for backend API)
- TensorFlow 2.x

## Installation

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Create Virtual Environment (Recommended)

**Why?** Keeps dependencies isolated from other projects.

```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Or (Windows CMD)
venv\Scripts\activate.bat

# Or (Mac/Linux)
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### 3. Install Backend Dependencies

**Make sure venv is activated first!**

```bash
pip install -r requirements.txt
```

Or manually:
```bash
pip install flask flask-cors tensorflow pillow numpy
```

> **Note:** If you prefer not to use a virtual environment, you can install directly, but it's not recommended. See `VENV_SETUP.md` for more details.

### 4. Verify Model File

Ensure your trained model `best_HCNN.h5` is in the `public/` folder.

## Running the Application

You need to run **both** the backend API and frontend server:

### Terminal 1: Start Backend API

**Important:** Make sure your virtual environment is activated (you should see `(venv)` in prompt)

```bash
python backend_api_example.py
```

You should see:
```
Loading model...
Model loaded successfully!
Starting server on http://localhost:5000
```

### Terminal 2: Start Frontend

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in terminal).

## Usage

1. Make sure both backend and frontend servers are running
2. Open your browser to the frontend URL (usually `http://localhost:5173`)
3. Click "Start Scan" on the home page
4. Choose to take a photo with camera or select from gallery
5. Upload an image of a tomato leaf
6. Wait for the AI analysis (usually takes 2-5 seconds)
7. View the disease prediction with confidence score
8. Read treatment and prevention recommendations

## Project Structure

```
mango-disease-predictor/
├── public/
│   └── best_HCNN.h5          # Trained model (used by backend)
├── src/
│   ├── components/
│   │   ├── Predict.jsx        # Main prediction component
│   │   ├── ImageSource.jsx    # Image upload selection
│   │   └── ...
│   ├── utils/
│   │   └── modelLoaderAPI.js  # API client for predictions
│   └── App.jsx
├── backend_api_example.py     # Flask backend server
├── requirements.txt           # Python dependencies
└── README.md
```

## How It Works

1. **Frontend (React)**: User uploads an image
2. **API Request**: Image is sent to backend API as base64
3. **Backend (Flask)**: Loads `.h5` model, preprocesses image, makes prediction
4. **Response**: Backend returns disease name and confidence
5. **Display**: Frontend shows results with treatment recommendations

## Model Information

- **Model Format:** Keras (.h5) - used directly, no conversion needed
- **Input Size:** 224x224 pixels (RGB)
- **Framework:** TensorFlow/Keras (Python backend)

## API Endpoints

### POST `/predict`
Predicts disease from uploaded image.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response:**
```json
{
  "success": true,
  "disease": "Tomato Early blight leaf",
  "confidence": 95.23,
  "allPredictions": [...]
}
```

### GET `/health`
Health check endpoint to verify API is running.

## Troubleshooting

### Backend Not Starting
- Ensure `best_HCNN.h5` exists in `public/` folder
- Check Python version: `python --version` (should be 3.7+)
- Verify all dependencies are installed: `pip list | grep tensorflow`
- Check for port conflicts (default port is 5000)

### Frontend Can't Connect to Backend
- Ensure backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify API URL in `src/utils/modelLoaderAPI.js` matches your backend port
- Try refreshing the page after starting backend

### Prediction Errors
- Ensure uploaded image is a valid image file
- Check that the image shows a tomato leaf clearly
- Verify backend console for error messages
- Check that model file is not corrupted

### Model Loading Issues
- Verify `best_HCNN.h5` file exists and is not corrupted
- Check backend console for model loading errors
- Ensure TensorFlow version is compatible (2.10+)

## Development

### Frontend Commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend Commands
```bash
# Run backend server
python backend_api_example.py

# Run with custom port (modify script)
FLASK_PORT=5001 python backend_api_example.py
```

## Configuration

### Change Backend Port

Edit `backend_api_example.py`:
```python
app.run(host='0.0.0.0', port=5000, debug=True)  # Change 5000 to your port
```

Then update `src/utils/modelLoaderAPI.js`:
```javascript
const API_URL = 'http://localhost:YOUR_PORT/predict';
```

### Change Model Input Size

If your model expects a different input size, edit `backend_api_example.py`:
```python
# In preprocess_image function, change:
image = image.resize((224, 224))  # Change to your model's expected size
```

## Technologies Used

- **Frontend:** React 19, Vite
- **Backend:** Flask, TensorFlow/Keras
- **ML Framework:** TensorFlow 2.x

## Alternative: Browser-Based Approach

If you prefer to run the model in the browser (no backend needed), see `MODEL_APPROACHES.md` for instructions on converting to TensorFlow.js format.

## License

This project is part of a Final Year Project (FYP).
