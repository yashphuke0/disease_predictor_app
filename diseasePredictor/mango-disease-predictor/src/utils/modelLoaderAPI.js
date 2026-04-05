/**
 * Alternative model loader using backend API
 * Use this if you prefer to keep the .h5 model on the server
 * instead of converting to TensorFlow.js format
 */

const API_URL = 'http://localhost:5000/predict'; // Update if your backend is on different port

/**
 * Predict disease from image using backend API
 * @param {string} imageDataUrl - Base64 encoded image data URL
 * @returns {Promise<{disease: string, confidence: number, allPredictions: Array}>}
 */
export const predictDiseaseAPI = async (imageDataUrl) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageDataUrl
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Prediction failed');
    }

    return {
      disease: result.disease,
      confidence: result.confidence,
      allPredictions: result.allPredictions
    };
  } catch (error) {
    console.error('API prediction error:', error);
    throw new Error(`Failed to get prediction: ${error.message}`);
  }
};

/**
 * Check if backend API is available
 */
export const checkAPIHealth = async () => {
  try {
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    return false;
  }
};

