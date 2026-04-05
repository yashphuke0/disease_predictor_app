# Virtual Environment Setup Guide

## What is a Virtual Environment?

A virtual environment is an isolated Python environment that keeps your project dependencies separate from other Python projects and your system Python installation.

## Why Use a Virtual Environment?

### ✅ Benefits:

1. **Isolation**: Each project has its own dependencies
   - Project A uses TensorFlow 2.10
   - Project B uses TensorFlow 2.15
   - No conflicts!

2. **Clean System**: Don't pollute your system Python
   - Keep your system Python clean
   - Easy to uninstall (just delete the folder)

3. **Reproducibility**: Easy to share exact dependencies
   - `requirements.txt` lists exact versions
   - Others can recreate your environment

4. **Version Control**: Different projects can use different Python/Package versions

5. **Easy Cleanup**: Delete the folder = uninstall everything

### ❌ Without Virtual Environment:

- All packages install globally
- Version conflicts between projects
- Hard to track what's installed for what project
- Can break system Python

## Creating a Virtual Environment

### Step 1: Create the Virtual Environment

```bash
# In your project directory
python -m venv venv
```

This creates a `venv` folder with an isolated Python environment.

### Step 2: Activate the Virtual Environment

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
venv\Scripts\activate.bat
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

After activation, you'll see `(venv)` in your terminal prompt:
```
(venv) F:\FYP\diseasePredictor\mango-disease-predictor>
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Verify Installation

```bash
pip list
```

You should see Flask, TensorFlow, etc. listed.

### Step 5: Run Your Backend

```bash
python backend_api_example.py
```

## Deactivating

When you're done, deactivate:
```bash
deactivate
```

## Important Notes

1. **Activate before installing**: Always activate the venv before installing packages
2. **Activate before running**: Always activate before running your backend
3. **Don't commit venv**: Add `venv/` to `.gitignore` (already done)
4. **Recreate if needed**: If venv gets corrupted, just delete it and recreate

## Quick Commands Reference

```bash
# Create venv
python -m venv venv

# Activate (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Activate (Windows CMD)
venv\Scripts\activate.bat

# Install dependencies
pip install -r requirements.txt

# Deactivate
deactivate
```

## Troubleshooting

### "Activate.ps1 cannot be loaded"
If you get an execution policy error on Windows PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "python -m venv" not found
Make sure Python is installed and in your PATH:
```bash
python --version
```

### Packages not found after activation
- Make sure you activated the venv (check for `(venv)` in prompt)
- Reinstall: `pip install -r requirements.txt`

