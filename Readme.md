VisionCaption
Because Every Picture Deserves a Story
An AI-powered web app that generates meaningful image captions using BLIP (Bootstrapped Language Image Pretraining).

Features
Upload images through a user-friendly UI

Automatically generate captions using a powerful vision-language model

Clean UI built with React and Tailwind CSS

Flask backend powered by Hugging Face Transformers

Tech Stack
Frontend: React, Tailwind CSS

Backend: Flask (Python)

Model: Salesforce/blip-image-captioning-large

Getting Started
Prerequisites
Python 3.8 or higher

Node.js and npm

Git (optional)

Backend Setup (Flask + Transformers)
Navigate to the backend/ folder:

bash
Copy
Edit
cd backend
(Optional but recommended) Create and activate a virtual environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
Install the required Python packages:

bash
Copy
Edit
pip install flask transformers pillow torch
Run the Flask server:

bash
Copy
Edit
python app.py
The backend will start at http://localhost:5000.

Frontend Setup (React + Tailwind)
Navigate to the frontend/ folder:

bash
Copy
Edit
cd ../frontend
Install the required npm packages:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm start
The frontend will be available at http://localhost:3000.

Usage
Open the React app in your browser.

Upload an image file.

Click the "Generate Caption" button.

The generated caption will appear along with the uploaded image.

Model Details
Model: Salesforce/blip-image-captioning-large

Uses multimodal transformers to generate natural captions based on image content.

Folder Structure
cpp
Copy
Edit
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