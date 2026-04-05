"""
Script to convert Keras .h5 model to TensorFlow.js format
Run this script to convert best_HCNN.h5 to TensorFlow.js format
"""

import os
import sys

try:
    import tensorflowjs as tfjs
    from tensorflow import keras
except ImportError:
    print("Error: tensorflowjs and tensorflow are required.")
    print("Install them using: pip install tensorflowjs tensorflow")
    sys.exit(1)

def convert_model():
    # Paths
    input_model = 'public/best_HCNN.h5'
    output_dir = 'public/model'
    
    # Check if input model exists
    if not os.path.exists(input_model):
        print(f"Error: Model file not found at {input_model}")
        print("Please ensure best_HCNN.h5 is in the public folder")
        sys.exit(1)
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Loading model from {input_model}...")
    try:
        # Load the Keras model
        model = keras.models.load_model(input_model)
        print("Model loaded successfully!")
        
        # Get model input shape for reference
        input_shape = model.input_shape
        print(f"Model input shape: {input_shape}")
        
        print(f"Converting model to TensorFlow.js format...")
        print(f"Output directory: {output_dir}")
        
        # Convert to TensorFlow.js
        tfjs.converters.save_keras_model(model, output_dir)
        
        print("\n✓ Conversion successful!")
        print(f"Model files saved to: {output_dir}/")
        print("\nFiles created:")
        for file in os.listdir(output_dir):
            file_path = os.path.join(output_dir, file)
            size = os.path.getsize(file_path)
            print(f"  - {file} ({size / 1024:.2f} KB)")
        
        print("\nNote: If your model expects a different input size than 224x224,")
        print("update the preprocessImage function in src/utils/modelLoader.js")
        
    except Exception as e:
        print(f"Error during conversion: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    convert_model()

