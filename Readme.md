# VisionCap

**Because Every Picture Deserves a Story**  
An AI-powered web app that generates meaningful image captions using BLIP (Bootstrapped Language Image Pretraining).

---

## Features

- Upload images through a user-friendly UI  
- Automatically generate captions using a powerful vision-language model  
- Clean UI built with React and Tailwind CSS  
- Flask backend powered by Hugging Face Transformers

---

## Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Flask (Python)  
- **Model:** `Salesforce/blip-image-captioning-large`

---

## Getting Started

### Prerequisites

- Python 3.8 or higher  
- Node.js and npm  
- Git (optional)

---

## Backend Setup (Flask + Transformers)

1. Navigate to the `backend/` folder:

   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. Install the required Python packages:

   ```bash
   pip install flask transformers pillow torch
   ```

4. Run the Flask server:

   ```bash
   python app.py
   ```

   The backend will start at `http://localhost:5000`.

---

## Frontend Setup (React + Tailwind)

1. Navigate to the `frontend/` folder:

   ```bash
   cd ../frontend
   ```

2. Install the required npm packages:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

---

## Usage

1. Open the React app in your browser.  
2. Upload an image file.  
3. Click the "Generate Caption" button.  
4. The generated caption will appear along with the uploaded image.

---

## Model Details

- Model: [`Salesforce/blip-image-captioning-large`](https://huggingface.co/Salesforce/blip-image-captioning-large)  
- Uses multimodal transformers to generate natural captions based on image content.

---

## Folder Structure

```
project-root/
│
├── backend/
│   └── app.py
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   └── public/
│
└── README.md
```

---

## Troubleshooting

- If the model loads slowly, it's likely downloading weights for the first time. Wait for the initial setup.
- Ensure both frontend (`localhost:3000`) and backend (`localhost:5000`) are running.
- If using CORS, verify Flask allows requests from the frontend.
