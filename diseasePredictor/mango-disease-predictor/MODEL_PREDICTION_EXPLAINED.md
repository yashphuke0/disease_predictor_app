# How Model Prediction Works

## Understanding Model Output

### 1. Model Output Format

When you train a classification model, it outputs **probabilities** (numbers between 0 and 1) for each class, not direct disease names.

**Example Model Output:**
```python
prediction = model.predict(image)
# Output shape: (1, 10) - 1 image, 10 disease classes

# Example output array:
[0.05, 0.02, 0.80, 0.01, 0.03, 0.02, 0.01, 0.03, 0.02, 0.01]
 ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑
 0     1     2     3     4     5     6     7     8     9
```

Each number represents the **probability** that the image belongs to that class:
- Index 0: 5% probability
- Index 1: 2% probability  
- Index 2: 80% probability ← **Highest = Predicted Disease**
- Index 3: 1% probability
- ... and so on

### 2. Finding the Predicted Disease

We use `np.argmax()` to find the index with the highest probability:

```python
predicted_class_idx = np.argmax(prediction[0])
# In example above: predicted_class_idx = 2
```

### 3. Mapping Index to Disease Name

**This is the critical part!** We need to know which index corresponds to which disease.

```python
TOMATO_DISEASES = [
    'Tomato Early blight leaf',      # Index 0
    'Tomato Septoria leaf spot',      # Index 1
    'Tomato Healthy Leaf',            # Index 2 ← Matches our prediction!
    'Tomato Leaf Bacterial Spot',     # Index 3
    # ... etc
]

disease_name = TOMATO_DISEASES[predicted_class_idx]
# disease_name = 'Tomato Healthy Leaf'
```

## The Problem: How Do We Know the Order?

**If you trained the model yourself**, you should know the order from your training code. The order depends on:

1. **How you loaded/prepared your training data**
2. **The order of classes in your dataset**
3. **How you used `ImageDataGenerator` or similar**

### Common Training Patterns:

**Pattern 1: Using ImageDataGenerator**
```python
train_datagen = ImageDataGenerator(...)
train_generator = train_datagen.flow_from_directory(
    'train_data/',
    class_mode='categorical'
)
# Classes are sorted alphabetically by folder name!
```

**Pattern 2: Manual Label Encoding**
```python
# If you manually encoded:
classes = ['Disease1', 'Disease2', 'Disease3']
# Then index 0 = Disease1, index 1 = Disease2, etc.
```

## How to Find the Correct Order

### Method 1: Check Your Training Code

Look at your training script and find:
- How classes were defined
- The order of folders in your dataset
- Any class mapping you created

### Method 2: Check Model Summary (if available)

Some models store class names. Try:
```python
model = keras.models.load_model('best_HCNN.h5')
print(model.summary())
# Check if there's a class_names attribute
```

### Method 3: Test with Known Images

1. Take a known healthy leaf image
2. Run prediction
3. Check which index has highest probability
4. That index = "Tomato Healthy Leaf"
5. Repeat for other diseases

### Method 4: Check Dataset Folder Structure

If your training data was organized like:
```
train_data/
  ├── Tomato_Early_blight_leaf/
  ├── Tomato_Septoria_leaf_spot/
  ├── Tomato_Healthy_Leaf/
  └── ...
```

The order is usually **alphabetical** by folder name!

## Current Implementation

In `backend_api_example.py`, we're using this order:

```python
TOMATO_DISEASES = [
    'Tomato Early blight leaf',      # Index 0
    'Tomato Septoria leaf spot',      # Index 1
    'Tomato Healthy Leaf',            # Index 2
    'Tomato Leaf Bacterial Spot',    # Index 3
    'Tomato Leaf Late Blight',        # Index 4
    'Tomato Leaf Mosaic Virus',       # Index 5
    'Tomato Leaf Yellow Virus',       # Index 6
    'Tomato Mold Leaf',               # Index 7
    'Tomato Spider Mite',            # Index 8
    'Tomato Target Spot'              # Index 9
]
```

**⚠️ IMPORTANT:** This order must match your training data order!

## Solution: Create a Verification Script

Let me create a script to help you verify the correct order.

