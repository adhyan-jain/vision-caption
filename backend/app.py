from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
from base64 import b64encode
from io import BytesIO
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and processor
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

def generate_caption(image):
    with Image.open(image) as img:
        raw_image = img.convert("RGB")
        inputs = processor(raw_image, return_tensors="pt", max_new_tokens=100)
        start_time = time.time()
        out = model.generate(**inputs)
        generation_time = time.time() - start_time
        caption = processor.decode(out[0], skip_special_tokens=True)
        return caption, generation_time

def convert_image_to_base64(image):
    pil_image = Image.open(image).convert('RGB')
    buffered = BytesIO()
    pil_image.save(buffered, format="JPEG")
    img_data = b64encode(buffered.getvalue()).decode('utf-8')
    return img_data

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        image = request.files['image']
        try:
            image_base64 = convert_image_to_base64(image)
        except Exception as e:
            return render_template('index.html', generation_message="Error processing image")
        
        try:
            caption, generation_time = generate_caption(image)
        except Exception as e:
            return render_template('index.html', generation_message="Error generating Caption")
        
        generation_message = f"generated in {generation_time:.2f} seconds" if generation_time is not None else "generated in -.-- seconds"
        return render_template('index.html', image=image_base64, caption=caption, generation_message=generation_message)
    
    return render_template('index.html')

# Fixed API endpoint to match frontend
@app.route('/api/caption', methods=['POST'])
def generate_caption_api():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400
        
        image = request.files['image']
        if image.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        caption, generation_time = generate_caption(image)
        
        response = {
            'caption': caption,
            'generation_time': generation_time
        }
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)