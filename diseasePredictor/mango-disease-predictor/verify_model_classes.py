"""
Script to verify the correct class order for your model
This helps you determine which index corresponds to which disease
"""

import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image
import os

# Load your model
print("Loading model...")
model = keras.models.load_model('public/best_HCNN.h5')
print("Model loaded successfully!")
print(f"Model output shape: {model.output_shape}")
print(f"Number of classes: {model.output_shape[1]}\n")

# Current class order (update this to match your training)
CURRENT_CLASSES = [
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
]

def preprocess_image(image_path):
    """Preprocess image for model input"""
    img = Image.open(image_path)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def test_prediction(image_path):
    """Test prediction on a single image"""
    img_array = preprocess_image(image_path)
    prediction = model.predict(img_array, verbose=0)
    
    # Get all predictions
    predictions = prediction[0]
    predicted_idx = np.argmax(predictions)
    confidence = predictions[predicted_idx] * 100
    
    print(f"\nImage: {os.path.basename(image_path)}")
    print(f"Predicted Index: {predicted_idx}")
    print(f"Predicted Disease: {CURRENT_CLASSES[predicted_idx]}")
    print(f"Confidence: {confidence:.2f}%")
    print("\nAll predictions:")
    for i, (disease, prob) in enumerate(zip(CURRENT_CLASSES, predictions)):
        marker = " ← HIGHEST" if i == predicted_idx else ""
        print(f"  [{i}] {disease}: {prob*100:.2f}%{marker}")
    
    return predicted_idx, confidence

def check_training_data_order():
    """
    If you have your training data folder, check the order
    """
    print("\n" + "="*60)
    print("CHECKING TRAINING DATA ORDER")
    print("="*60)
    
    # Common training data locations
    possible_paths = [
        'train_data',
        'data/train',
        'dataset/train',
        'training_data'
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            print(f"\nFound training data at: {path}")
            folders = sorted([f for f in os.listdir(path) if os.path.isdir(os.path.join(path, f))])
            print(f"\nFolder order (alphabetical):")
            for idx, folder in enumerate(folders):
                print(f"  [{idx}] {folder}")
            print("\n⚠️  If you used ImageDataGenerator, classes are usually in THIS order!")
            return folders
    
    print("\nTraining data folder not found.")
    print("If you know where your training data is, check the folder order there.")
    return None

def main():
    print("="*60)
    print("MODEL CLASS ORDER VERIFICATION")
    print("="*60)
    
    # Check training data order
    training_folders = check_training_data_order()
    
    # Test with sample images if available
    print("\n" + "="*60)
    print("TESTING WITH SAMPLE IMAGES")
    print("="*60)
    print("\nTo verify the order, test with known images:")
    print("1. Get a known healthy leaf image")
    print("2. Run: python verify_model_classes.py <image_path>")
    print("3. Check which index has highest probability")
    print("4. That index should match 'Tomato Healthy Leaf' in your array")
    
    # If image path provided as argument
    import sys
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        if os.path.exists(image_path):
            test_prediction(image_path)
        else:
            print(f"\nError: Image not found at {image_path}")
    else:
        print("\n" + "="*60)
        print("CURRENT CLASS MAPPING")
        print("="*60)
        print("\nCurrent order in backend_api_example.py:")
        for idx, disease in enumerate(CURRENT_CLASSES):
            print(f"  [{idx}] {disease}")
        
        print("\n" + "="*60)
        print("HOW TO VERIFY")
        print("="*60)
        print("""
1. Check your training code:
   - Look for ImageDataGenerator or class definitions
   - Check the order of folders in your dataset
   - Usually alphabetical order!

2. Test with known images:
   - Use a known healthy leaf → should predict index 2
   - Use a known diseased leaf → check which index is highest
   - Match the index to the disease name

3. Update backend_api_example.py:
   - Reorder TOMATO_DISEASES array to match your model
   - The order MUST match your training data order!
        """)

if __name__ == '__main__':
    main()

