"""
Backend API Example - Flask server to serve predictions using .h5 model directly
This allows you to use the .h5 model without conversion

Install dependencies:
    pip install -r requirements.txt

Run locally:
    python backend_api_example.py

Run on Render (dashboard or Procfile):
    gunicorn backend_api_example:app --bind 0.0.0.0:$PORT --timeout 300 --workers 1

Env:
    MODEL_PATH — path to .h5 file (default: public/best_HCNN.h5)
    CORS_ORIGINS — comma-separated frontend origins (default includes Render + Vite dev)
    PORT — only used when running this file directly (Render sets PORT for gunicorn)
"""

import os
from pathlib import Path

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import keras
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
# Origins that may call this API (browser Origin header). 502s from the proxy carry no CORS headers;
# fixing timeouts/cold start avoids that. Override on Render: CORS_ORIGINS=https://your-frontend.onrender.com
_default_cors = (
    "https://disease-predictor-app-1.onrender.com,"
    "http://localhost:5173,http://127.0.0.1:5173"
)
_cors_origins = [
    o.strip()
    for o in os.environ.get("CORS_ORIGINS", _default_cors).split(",")
    if o.strip()
]
CORS(
    app,
    origins=_cors_origins,
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    max_age=86400,
)

_model_path = os.environ.get("MODEL_PATH", "public/best_HCNN.h5")
_model_path = Path(_model_path)
if not _model_path.is_file():
    raise FileNotFoundError(
        f"Model file not found: {_model_path.resolve()}. "
        "Set MODEL_PATH or add the .h5 under public/."
    )

print("Loading model...")
model = keras.models.load_model(str(_model_path))
print("Model loaded successfully!")
print(f"Model input shape: {model.input_shape}")

# Disease classes - MUST match training label order exactly
TOMATO_DISEASES = [
    'Bacterial_spot',
    'Early_blight',
    'Late_blight',
    'Leaf_Mold',
    'Septoria_leaf_spot',
    'Spider_mites Two-spotted_spider_mite',
    'Target_Spot',
    'Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato_mosaic_virus',
    'healthy',
]

def preprocess_image(image_data):
    """
    Preprocess image for model input
    - Decode base64 image
    - Resize to 224x224
    - Normalize to [0, 1]
    """
    # Remove data URL prefix if present
    if ',' in image_data:
        image_data = image_data.split(',')[1]

    # Decode base64
    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes))

    # Convert to RGB if needed
    if image.mode != 'RGB':
        image = image.convert('RGB')

    # Resize to 224x224 (adjust if your model expects different size)
    image = image.resize((224, 224))

    # Convert to numpy array and normalize
    img_array = np.array(image) / 255.0

    # Add batch dimension: (1, 224, 224, 3)
    img_array = np.expand_dims(img_array, axis=0)

    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict disease from uploaded image
    Expects JSON with 'image' field containing base64 encoded image
    """
    try:
        data = request.get_json()

        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        # Preprocess image
        img_array = preprocess_image(data['image'])

        # Make prediction
        prediction = model.predict(img_array, verbose=0)

        # Get prediction results
        predicted_class_idx = np.argmax(prediction[0])
        confidence = float(prediction[0][predicted_class_idx] * 100)

        # Get all predictions
        all_predictions = [
            {
                'disease': TOMATO_DISEASES[i],
                'confidence': float(prediction[0][i] * 100)
            }
            for i in range(len(TOMATO_DISEASES))
        ]
        all_predictions.sort(key=lambda x: x['confidence'], reverse=True)

        return jsonify({
            'success': True,
            'disease': TOMATO_DISEASES[predicted_class_idx],
            'confidence': round(confidence, 2),
            'allPredictions': all_predictions
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'model_loaded': model is not None})

@app.route('/debug/classes', methods=['GET'])
def debug_classes():
    """
    Debug endpoint to show current class mapping
    Helps verify if the class order matches your training data
    """
    return jsonify({
        'num_classes': len(TOMATO_DISEASES),
        'classes': [
            {'index': i, 'name': disease}
            for i, disease in enumerate(TOMATO_DISEASES)
        ],
        'model_output_shape': str(model.output_shape)
    })

@app.route('/debug/predict', methods=['POST'])
def debug_predict():
    """
    Debug endpoint that shows raw prediction values
    Useful for verifying class order
    """
    try:
        data = request.get_json()

        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        # Preprocess image
        img_array = preprocess_image(data['image'])

        # Make prediction
        prediction = model.predict(img_array, verbose=0)

        # Return raw predictions with class mapping
        raw_predictions = prediction[0].tolist()
        predicted_class_idx = int(np.argmax(prediction[0]))

        return jsonify({
            'raw_predictions': raw_predictions,
            'predicted_index': predicted_class_idx,
            'predicted_class': TOMATO_DISEASES[predicted_class_idx],
            'class_mapping': [
                {
                    'index': i,
                    'class_name': TOMATO_DISEASES[i],
                    'probability': float(raw_predictions[i]),
                    'percentage': float(raw_predictions[i] * 100)
                }
                for i in range(len(TOMATO_DISEASES))
            ],
            'sorted_by_confidence': sorted(
                [
                    {
                        'index': i,
                        'class_name': TOMATO_DISEASES[i],
                        'probability': float(raw_predictions[i]),
                        'percentage': float(raw_predictions[i] * 100)
                    }
                    for i in range(len(TOMATO_DISEASES))
                ],
                key=lambda x: x['probability'],
                reverse=True
            )
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", "5000"))
    print("\n" + "="*50)
    print("Tomato Disease Prediction API")
    print("="*50)
    print(f"Model input shape: {model.input_shape}")
    print(f"\nStarting server on http://0.0.0.0:{port}")
    print(f"API endpoint: http://localhost:{port}/predict")
    print("\nPress Ctrl+C to stop")
    print("="*50 + "\n")

    app.run(host="0.0.0.0", port=port, debug=False)
