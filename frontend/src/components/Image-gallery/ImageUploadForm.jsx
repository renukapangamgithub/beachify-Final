import React, { useState } from 'react';
import axios from 'axios';
const BACKEND_URL = 'https://beachify-final-backend.onrender.com';
const ImageUploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
     await axios.post(`${BACKEND_URL}/api/gallery/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Image uploaded successfully!');
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess(); // Notify parent to refresh gallery
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-buttons">
      <label className="choose-file-btn">
        Choose Files
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }} // Hide actual input visually here
        />
      </label>
      <button
        type="submit"
        className="upload-btn"
        disabled={!file}
      >
        Upload Image
      </button>
    </form>
  );
};

export default ImageUploadForm;
