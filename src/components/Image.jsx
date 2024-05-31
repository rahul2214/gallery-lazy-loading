import React, { useRef, useEffect, useState } from 'react';

const Image = ({ src, alt }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            });
        });

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="image-container">
            {isVisible ? <img src={src} alt={alt} ref={imgRef} /> : <div ref={imgRef} className="placeholder">Loading...</div>}
        </div>
    );
};

export default Image;
