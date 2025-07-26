import React, { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState(null);
  const [tone, setTone] = useState("happy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setCaption(null);
      setError(null);
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setCaption(null);
      setError(null);
    } else {
      setError("Please drop a valid image file.");
    }
  };

  const generateCaption = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setCaption(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/caption", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setCaption(data.caption);
      } else {
        setError(data.error || "Unknown error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the backend. Is the Flask server running?");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setCaption(null);
    setError(null);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1 className="app-title">🎭 VisionCap !</h1>
          <p className="app-subtitle">Because Every Picture Deserves a Story !</p>
        </header>

        <div
          className={`upload-box ${loading ? "uploading" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <div className="upload-content">
            <div className="upload-icon">📂</div>
            <p className="upload-text">
              Drag & Drop Image Here <br />
              <span className="or-text">OR</span> <br />
              Click to Choose From File
            </p>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageChange}
              className="file-input"
            />
          </div>
        </div>

        <div className="tone-selector">
          <label className="tone-label">Caption Tone: </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="tone-select"
          >
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="angry">😡 Angry</option>
            <option value="funny">😂 Funny</option>
            <option value="love">❤️ Love</option>
            <option value="excited">🤩 Excited</option>
            <option value="confused">🤔 Confused</option>
          </select>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        {preview && (
          <div className="preview-section fade-in">
            <div className="preview-header">
              <h3 className="preview-title">Uploaded Image:</h3>
              <button className="clear-button" onClick={clearImage}>✕ Clear</button>
            </div>
            <div className="preview-container">
              <img src={preview} alt="preview" className="preview-image" />
            </div>
          </div>
        )}

        <button
          className={`generate-btn ${loading ? "loading" : ""} ${!image ? "disabled" : ""}`}
          onClick={generateCaption}
          disabled={loading || !image}
        >
          {loading ? <><span className="spinner"></span> Generating...</> : "Generate Caption"}
        </button>

        {caption && !loading && (
          <div className="result-section fade-in">
            <h3 className="result-title">Generated Caption:</h3>
            <div className="caption-container">
              <p className="caption-text">🗨️ {caption}</p>
              <button
                className="copy-button"
                onClick={() => navigator.clipboard.writeText(caption)}
                title="Copy to clipboard"
              >
                📋 Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
