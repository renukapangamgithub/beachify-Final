import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import './MasonryImagesGallery.css';  
import axios from 'axios';
import ImageUploadForm from './ImageUploadForm';

const MasonryImagesGallery = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="masonry-gallery">
      <p className="gallery-subtitle">#LOVEWITHBEACHIFY#</p>
      <h2 className="gallery-title">Explore Beautiful Moments ❤️</h2>

      {/* ⬇️ Move Upload Form here */}
      <section className="upload-section" style={{ textAlign: 'center', margin: '1rem 0' }}>
        <ImageUploadForm onUploadSuccess={fetchImages} />
      </section>

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 4 }}>
        <Masonry gutter="1rem">
          {images.map((img, index) => (
            <img
              className="masonry__img"
              key={index}
              src={`http://localhost:5000/${img.imageUrl}`}
              alt={`Gallery Image ${index + 1}`}
              style={{ width: '100%', display: 'block', borderRadius: '10px' }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
};

export default MasonryImagesGallery;
