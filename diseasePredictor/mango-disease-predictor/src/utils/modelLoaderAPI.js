/**
 * Alternative model loader using backend API
 * Use this if you prefer to keep the .h5 model on the server
 * instead of converting to TensorFlow.js format
 */

// Production: set VITE_API_BASE_URL on the host that builds the app (Render/Vercel). No trailing slash.
// Local dev: use http://localhost:5000 in .env, or leave unset. Placeholder URLs from docs break local runs.
const rawApiBase = (import.meta.env.VITE_API_BASE_URL || '').trim();
const isDocPlaceholder =
  import.meta.env.DEV && rawApiBase !== '' && /your-backend/i.test(rawApiBase);
const API_BASE = (
  isDocPlaceholder ? 'http://localhost:5000' : rawApiBase || 'http://localhost:5000'
).replace(/\/$/, '');
if (isDocPlaceholder) {
  console.warn(
    '[modelLoaderAPI] VITE_API_BASE_URL is a placeholder; using http://localhost:5000. Point it at your real API or use http://localhost:5000 when running backend_api_example.py locally.'
  );
}
const API_URL = `${API_BASE}/predict`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Wait until /health returns ok (Render free tier cold start often needs 30–90s).
 * Stops after maxWaitMs so the UI can still show an error.
 */
export const wakeUpBackend = async (maxWaitMs = 120000, intervalMs = 2500) => {
  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${API_BASE}/health`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok') return true;
      }
    } catch {
      /* connection reset / DNS while instance wakes */
    }
    await sleep(intervalMs);
  }
  return false;
};

/**
 * Predict disease from image using backend API
 * @param {string} imageDataUrl - Base64 encoded image data URL
 * @returns {Promise<{disease: string, confidence: number, allPredictions: Array}>}
 */
export const predictDiseaseAPI = async (imageDataUrl) => {
  const maxAttempts = 3;
  const body = JSON.stringify({ image: imageDataUrl });
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if ((response.status === 502 || response.status === 503) && attempt < maxAttempts) {
        await sleep(10000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Prediction failed');
      }

      return {
        disease: result.disease,
        confidence: result.confidence,
        allPredictions: result.allPredictions,
      };
    } catch (error) {
      lastError = error;
      const isNetwork =
        error instanceof TypeError ||
        (typeof error.message === 'string' && error.message.includes('Failed to fetch'));
      if (isNetwork && attempt < maxAttempts) {
        await sleep(10000);
        continue;
      }
      console.error('API prediction error:', error);
      throw new Error(`Failed to get prediction: ${error.message}`);
    }
  }

  console.error('API prediction error:', lastError);
  throw new Error(`Failed to get prediction: ${lastError?.message || 'unknown error'}`);
};

/**
 * Check if backend API is available
 */
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    return false;
  }
};

