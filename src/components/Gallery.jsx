// src/components/Gallery.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Image from './Image';
import Spinner from './Spinner';

const accessKey = 'Hdj7IskPc5dYN4RRaRzyvpuM9M5bEo3ac11sq5EfVVQ';  // Replace with your Unsplash access key

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    const fetchImages = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.unsplash.com/photos`, {
                params: { page, per_page: 10 },
                headers: {
                    Authorization: `Client-ID ${accessKey}`
                }
            });
            setImages(prevImages => [...prevImages, ...response.data]);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }, [page]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setPage(prevPage => prevPage + 1);
                }
            });
        });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="gallery">
            {images.map((image, index) => (
                <Image key={index} src={image.urls.small} alt={image.alt_description} />
            ))}
            <br />
            <br />
           
            <div ref={loader} >
                <Spinner />
            </div>
        </div>
    );
};

export default Gallery;
