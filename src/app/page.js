"use client";
import React, { useState, useRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function Choice() {
  const [images, setImages] = useState([null, null]);
  const [catImage, setCatImage] = useState(null);
  const [showCatImage, setShowCatImage] = useState(false);
  const [catStyle, setCatStyle] = useState({});
  const imageRefs = useRef([]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleSubmit = () => {
    // Select a random cat image
    const catImages = [
      "/assets/images/cats/cat1.png",
      "/assets/images/cats/cat2.png",
      "/assets/images/cats/cat3.png",
    ];
    const randomCat = catImages[Math.floor(Math.random() * catImages.length)];

    // Get the position of a random image
    const targetIndex = Math.floor(Math.random() * images.length);
    const targetElement = imageRefs.current[targetIndex];

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setCatImage(randomCat);

      // Set cat image position
      setCatStyle({
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: "200px", // Ensure this matches the image size
        height: "auto",
        zIndex: 10, // Ensure the cat image is on top
      });
      setShowCatImage(true);

      // Hide the cat image after animation
      setTimeout(() => {
        setCatStyle({});
        setShowCatImage(false);
      }, 4000); // Adjust the duration as needed
    }
  };

  return (
    <div className="bg-white py-5 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pick one from ...
          </p>
          <div className="pt-10 flex justify-center items-center space-x-10">
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => (imageRefs.current[index] = el)}
                className="relative w-[18rem] md:h-[20rem] border-dotted border-2 border-gray-500 rounded-lg hover:bg-blue-50 cursor-pointer"
              >
                {image ? (
                  <>
                    <img
                      src={image}
                      alt={`Selected ${index}`}
                      className="w-full h-full object-cover rounded-lg p-5"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(event) => handleFileChange(index, event)}
                      className="hidden"
                      id={`file-input-${index}`}
                    />
                    <label
                      htmlFor={`file-input-${index}`}
                      className="w-full h-full flex flex-col justify-center items-center cursor-pointer"
                    >
                      <CloudArrowUpIcon className="h-10 w-10 text-gray-500" />
                      <span className="mt-2 text-gray-500">
                        Upload or Take Photo
                      </span>
                    </label>
                  </>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-full w-11/12 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white mt-20"
          >
            Pick one
          </button>
          {showCatImage && (
            <img
              src={catImage}
              alt="Random Cat"
              className="animate-cat"
              style={catStyle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
