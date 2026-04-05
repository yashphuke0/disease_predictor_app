# Model Prediction Flow - Visual Explanation

## How It Works: Step by Step

### Step 1: Model Output (Numbers, Not Names)

When you feed an image to your model, it outputs an **array of probabilities**:

```python
# Model output example:
prediction = [0.05, 0.02, 0.80, 0.01, 0.03, 0.02, 0.01, 0.03, 0.02, 0.01]
              ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑
Index:        0     1     2     3     4     5     6     7     8     9
```

Each number = probability that the image belongs to that class
- Index 0: 5% chance
- Index 1: 2% chance
- **Index 2: 80% chance** ← Highest = This is the prediction!
- Index 3: 1% chance
- etc.

### Step 2: Find the Highest Probability

```python
predicted_class_idx = np.argmax(prediction[0])
# In our example: predicted_class_idx = 2
```

### Step 3: Map Index to Disease Name

**This is where the order matters!**

```python
TOMATO_DISEASES = [
    'Tomato Early blight leaf',      # Index 0
    'Tomato Septoria leaf spot',      # Index 1
    'Tomato Healthy Leaf',            # Index 2 ← Matches our prediction!
    'Tomato Leaf Bacterial Spot',     # Index 3
    # ... etc
]

disease_name = TOMATO_DISEASES[predicted_class_idx]
# disease_name = TOMATO_DISEASES[2] = 'Tomato Healthy Leaf'
```

## Visual Flow Diagram

```
Image Upload
    ↓
Preprocess (resize, normalize)
    ↓
Model Prediction
    ↓
Output: [0.05, 0.02, 0.80, 0.01, ...]  ← Array of probabilities
    ↓
Find max: Index 2 (80%)
    ↓
Map to name: TOMATO_DISEASES[2] = "Tomato Healthy Leaf"
    ↓
Display: "Tomato Healthy Leaf (80% confidence)"
```

## The Critical Question

**How do we know Index 2 = "Tomato Healthy Leaf"?**

Answer: **The order must match your training data order!**

## Current Implementation

In `backend_api_example.py` (lines 31-42):

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
    'Tomato Spider Mite',             # Index 8
    'Tomato Target Spot'              # Index 9
]
```

**⚠️ This order MUST match your training data order!**

## How to Verify/Find the Correct Order

See `HOW_TO_FIND_CLASS_ORDER.md` for detailed instructions.

Quick methods:
1. Check your training code
2. Use debug endpoint: `GET /debug/classes`
3. Test with known images
4. Run: `python verify_model_classes.py`

## Summary

- **Model outputs:** Numbers (probabilities) for each class
- **We find:** Index with highest probability
- **We map:** Index → Disease name using array
- **Critical:** Array order must match training order!

