import * as tf from '@tensorflow/tfjs';

// Tomato disease classes
export const TOMATO_DISEASES = [
  'Tomato Early blight leaf',
  'Tomato Septoria leaf spot',
  'Tomato Healthy Leaf',
  'Tomato Leaf Bacterial Spot',
  'Tomato Leaf Late Blight',
  'Tomato Leaf Mosaic Virus',
  'Tomato Leaf Yellow Virus',
  'Tomato Mold Leaf',
  'Tomato Spider Mite',
  'Tomato Target Spot'
];

let model = null;

/**
 * Load the TensorFlow.js model
 * Note: The .h5 model needs to be converted to TensorFlow.js format first
 * Place the converted model files in the public folder
 * 
 * To convert: Run `python convert_model.py` or use tensorflowjs_converter
 */
export const loadModel = async () => {
  if (model) {
    return model;
  }

  try {
    // Load the model from public folder
    // The model should be converted from .h5 to TensorFlow.js format
    // and placed in public/model/ folder with model.json and shard files
    model = await tf.loadLayersModel('/model/model.json');
    console.log('Model loaded successfully');
    console.log('Model input shape:', model.inputs[0].shape);
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    const errorMessage = error.message || 'Unknown error';
    
    if (errorMessage.includes('404') || errorMessage.includes('Failed to fetch')) {
      throw new Error(
        'Model not found. Please convert the .h5 model to TensorFlow.js format first.\n' +
        'Run: python convert_model.py\n' +
        'Or see MODEL_CONVERSION.md for instructions.'
      );
    }
    
    throw new Error(`Failed to load model: ${errorMessage}`);
  }
};

/**
 * Preprocess image for model input
 * Resizes image to 224x224 (common size for CNN models)
 * Normalizes pixel values to [0, 1]
 */
export const preprocessImage = async (imageElement) => {
  return tf.tidy(() => {
    // Convert image to tensor
    let tensor = tf.browser.fromPixels(imageElement);
    
    // Resize to 224x224 (adjust if your model expects different size)
    const resized = tf.image.resizeBilinear(tensor, [224, 224]);
    
    // Normalize pixel values to [0, 1]
    const normalized = resized.div(255.0);
    
    // Add batch dimension: [1, 224, 224, 3]
    const batched = normalized.expandDims(0);
    
    return batched;
  });
};

/**
 * Predict disease from image
 * @param {HTMLImageElement|string} image - Image element or image URL
 * @returns {Promise<{disease: string, confidence: number, allPredictions: Array}>}
 */
export const predictDisease = async (image) => {
  try {
    // Load model if not already loaded
    const loadedModel = await loadModel();
    
    // Create image element if URL is provided
    let imageElement;
    if (typeof image === 'string') {
      imageElement = new Image();
      imageElement.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        imageElement.onload = resolve;
        imageElement.onerror = reject;
        imageElement.src = image;
      });
    } else {
      imageElement = image;
    }
    
    // Preprocess image
    const preprocessed = await preprocessImage(imageElement);
    
    // Make prediction
    const prediction = loadedModel.predict(preprocessed);
    
    // Get prediction data
    const predictionData = await prediction.data();
    
    // Clean up tensors
    preprocessed.dispose();
    prediction.dispose();
    
    // Get the index with highest probability
    const maxIndex = predictionData.indexOf(Math.max(...predictionData));
    const confidence = Math.max(...predictionData) * 100;
    
    // Get all predictions with their probabilities
    const allPredictions = TOMATO_DISEASES.map((disease, index) => ({
      disease,
      confidence: predictionData[index] * 100
    })).sort((a, b) => b.confidence - a.confidence);
    
    return {
      disease: TOMATO_DISEASES[maxIndex],
      confidence: Math.round(confidence * 100) / 100,
      allPredictions
    };
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};

