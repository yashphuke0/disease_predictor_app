# Model Conversion Guide

## Converting .h5 Model to TensorFlow.js Format

Your trained model (`best_HCNN.h5`) needs to be converted to TensorFlow.js format before it can be used in the web app.

### Step 1: Install TensorFlow.js Converter

```bash
pip install tensorflowjs
```

### Step 2: Convert the Model

Run the following command in your terminal (from the project root or where your .h5 file is located):

```bash
tensorflowjs_converter --input_format=keras public/best_HCNN.h5 public/model
```

This will create:
- `public/model/model.json` - Model architecture and weights metadata
- `public/model/*.bin` - Weight files (shards)

### Step 3: Verify the Conversion

After conversion, your `public` folder should have:
```
public/
  ├── model/
  │   ├── model.json
  │   └── *.bin (one or more weight shard files)
  └── best_HCNN.h5 (original file, can be kept or removed)
```

### Step 4: Update Model Input Size (if needed)

If your model expects a different input size than 224x224, update the `preprocessImage` function in `src/utils/modelLoader.js`:

```javascript
// Change this line if your model expects different dimensions
const resized = tf.image.resizeBilinear(tensor, [224, 224]);
```

Common sizes:
- 224x224 (default)
- 256x256
- 128x128
- 299x299 (for Inception models)

### Alternative: Using Python Script

You can also create a Python script to convert the model:

```python
import tensorflowjs as tfjs

# Convert the model
tfjs.converters.save_keras_model(
    model_path='public/best_HCNN.h5',
    artifacts_dir='public/model'
)
```

### Troubleshooting

1. **Model not loading**: Make sure the `public/model/model.json` file exists and is accessible
2. **CORS errors**: Ensure the model files are served from the same origin or configure CORS properly
3. **Input shape mismatch**: Check your model's expected input shape and update preprocessing accordingly

### Testing the Model

After conversion, the app will automatically load the model when you upload an image. Check the browser console for any errors.

