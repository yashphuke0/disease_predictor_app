# How to Find the Correct Class Order for Your Model

## The Problem

Your model outputs **numbers (probabilities)**, not disease names. Each number corresponds to a class index:

```
Model Output: [0.05, 0.02, 0.80, 0.01, ...]
              Index 0  Index 1  Index 2  ...
```

We need to know: **Which index = which disease?**

## Quick Answer

The order depends on **how you trained your model**. Common scenarios:

### Scenario 1: Used ImageDataGenerator (Most Common)

If your training data was organized in folders like:
```
train_data/
  ├── Tomato_Early_blight_leaf/
  ├── Tomato_Healthy_Leaf/
  ├── Tomato_Septoria_leaf_spot/
  └── ...
```

**Classes are usually in ALPHABETICAL order by folder name!**

So the order would be:
- Index 0: Tomato_Early_blight_leaf
- Index 1: Tomato_Healthy_Leaf
- Index 2: Tomato_Septoria_leaf_spot
- etc.

### Scenario 2: Manual Class Definition

If you manually defined classes in your training code:
```python
classes = ['Disease1', 'Disease2', 'Disease3']
```

Then the order matches your array:
- Index 0 = Disease1
- Index 1 = Disease2
- Index 2 = Disease3

## How to Verify the Order

### Method 1: Check Your Training Code

1. Open your training script (where you trained `best_HCNN.h5`)
2. Look for:
   - `ImageDataGenerator` and `flow_from_directory`
   - Class definitions
   - Label encoding
3. Note the order used during training

### Method 2: Use the Debug Endpoint

Start your backend and test:

```bash
# 1. Start backend
python backend_api_example.py

# 2. In another terminal, check current mapping
curl http://localhost:5000/debug/classes

# 3. Test with an image (use Postman or curl)
# POST to http://localhost:5000/debug/predict
# Body: {"image": "base64_encoded_image"}
```

The debug endpoint shows:
- Raw prediction values for each index
- Which index has highest probability
- Current class mapping

### Method 3: Use the Verification Script

```bash
# Run the verification script
python verify_model_classes.py

# Or test with a specific image
python verify_model_classes.py path/to/test_image.jpg
```

### Method 4: Test with Known Images

1. **Get a known healthy leaf image**
   - Upload it through your app
   - Check which index has highest probability
   - That index = "Tomato Healthy Leaf"
   - Update your array so that index matches "Tomato Healthy Leaf"

2. **Repeat for other diseases**
   - Test with each known disease
   - Map the highest index to the disease name

## Example: Finding the Order

Let's say you test with a healthy leaf and get:
```
Raw predictions: [0.01, 0.02, 0.95, 0.01, ...]
                 Index 0  Index 1  Index 2  ...
```

Index 2 has 95% probability → This is "Tomato Healthy Leaf"

So in your `TOMATO_DISEASES` array:
```python
TOMATO_DISEASES = [
    '...',  # Index 0
    '...',  # Index 1
    'Tomato Healthy Leaf',  # Index 2 ← Must be here!
    '...',  # Index 3
    ...
]
```

## Updating the Backend

Once you know the correct order:

1. Open `backend_api_example.py`
2. Find the `TOMATO_DISEASES` array (around line 31)
3. Reorder it to match your model's output order
4. Restart the backend

```python
# Example: If your model outputs in this order:
TOMATO_DISEASES = [
    'Tomato Leaf Bacterial Spot',    # Index 0
    'Tomato Early blight leaf',      # Index 1
    'Tomato Healthy Leaf',           # Index 2
    # ... etc in the correct order
]
```

## Common Issues

### Issue: Predictions seem wrong

**Solution:** The class order is probably incorrect. Use the debug endpoint to see raw predictions and verify.

### Issue: Don't remember training order

**Solution:** 
1. Check your training data folder structure
2. Test with known images
3. Use the verification script

### Issue: Model was trained by someone else

**Solution:**
1. Ask the person who trained it for the class order
2. Or test extensively with known images to map each index

## Quick Test

To quickly test if your current order is correct:

1. Start backend: `python backend_api_example.py`
2. Upload a known healthy leaf image
3. Check the prediction
4. If it says "Tomato Healthy Leaf" → Order is likely correct!
5. If it says something else → Order needs to be fixed

## Need Help?

If you're still unsure:
1. Check the debug endpoint output
2. Test with multiple known images
3. Compare predictions with expected results
4. Adjust the order in `TOMATO_DISEASES` array accordingly

