"use client";
import React, { useState, useRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import ReactModal from "react-modal"; // For modal popup
import Confetti from "react-confetti"; // To add celebration confetti
import useSound from "use-sound"; // To play music
import cat from "../assets/images/cats/cat.png"; // Cat image
import Image from "next/image";
export default function Choice() {
  const [images, setImages] = useState([null, null]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showPickAgainPopup, setShowPickAgainPopup] = useState(false); 
  const [showKnowMorePopup, setShowKnowMorePopup] = useState(false);
  const imageRefs = useRef([]);
  
  const [playCelebration] = useSound("/sounds/party.mp3");

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
    setIsModalOpen(true);
    setIsImageLoading(true);
    setShowPickAgainPopup(false); 
    console.log("Developed by Dheeraj Dileep(GIthub : i0dheerajdileep ) and Karthik E(GIthub : karthike2003)")
    setTimeout(() => {
      const targetIndex = Math.floor(Math.random() * images.length);
      setSelectedImageIndex(targetIndex);
      setIsImageLoading(false); 
      playCelebration(); 
    }, 3000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowPickAgainPopup(false);
    setShowKnowMorePopup(false); // Close the Pick Again popup when closing the main modal
  };

  const handlePickAgain = () => {
    setShowPickAgainPopup(true);
    setIsModalOpen(false);
    setShowKnowMorePopup(false); // Close the main modal
  };

  const handleKnowMore = () => { 
    setShowKnowMorePopup(true);
  }

  return (
<div className="bg-custom-bg h-screen w-full  bg-white py-20 md:py-24  bg-cover bg-center bg-no-repeat !important">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
            Pick one from ...
          </p>
          <div className="pt-10 flex flex-wrap justify-center items-center gap-4 sm:space-x-10">
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => (imageRefs.current[index] = el)}
                className="relative w-[18rem] md:h-[20rem] h-[15rem]  border border-dotted border-gray-500 rounded-lg hover:bg-blue-100 hover:bg-opacity-30 cursor-pointer"
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
                      onChange={(event) => handleFileChange(index, event)}
                      className="hidden"
                      id={`file-input-${index}`}
                    />
                    <label
                      htmlFor={`file-input-${index}`}
                      className="w-full h-full flex flex-col justify-center rounded-lg items-center cursor-pointer bg-white opacity-40"
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
            className="rounded-full w-11/12 py-3 bg-blue-900 text-white mt-20"
          >
            Pick One
          </button>
          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="flex justify-center items-center p-4 h-40"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              {!isImageLoading && <Confetti />}
              {!isImageLoading && <h2 className="text-2xl font-bold mb-4 text-black">Paws up, we did it!</h2>}
              <Image
                src={
                  isImageLoading
                    ? cat
                    : images[selectedImageIndex]
                }
                alt={
                  isImageLoading ? "Loading Cat" : `Selected ${selectedImageIndex}`
                }
                className={`w-full max-w-sm mx-auto object-cover rounded-lg ${isImageLoading ? "animate-pulse" : ""}`}
                onError={() => console.error("Failed to load image")}
                width={300}
                height={200}
              />
              {isImageLoading && <h2 className="text-2xl max-w-md font-bold mb-4 text-black">The wizard kitty is cooking up something magical...</h2> }
              {!isImageLoading && <button
                onClick={handlePickAgain}
                className="mt-6 px-6 py-3 bg-blue-900 w-full text-white rounded-full"
              >
                Pick Again
              </button>}
              {!isImageLoading &&  <button
                onClick={() => closeModal()}
                className="mt-3 px-6 py-3 bg-blue-900 w-full text-white rounded-full"
              >
                Close
              </button>}
            </div>
          </ReactModal>

          <ReactModal
            isOpen={showPickAgainPopup}
            onRequestClose={() => setShowPickAgainPopup(false)}
            className="flex justify-center items-center p-4 h-40 max-w-md"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          >
            {!isImageLoading && <Confetti />}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">
                {showKnowMorePopup ?"Do you know why ?" : "The wise cat says. . ." }
              </h2>
              {!showKnowMorePopup && <Image
                src={cat}
                alt="Cat Image"
                className="w-full max-w-sm mx-auto object-cover rounded-lg"
                width={300}
                height={200}
              />}
              {!showKnowMorePopup && <h2 className="text-2xl font-bold mb-4 text-black">
                You should choose the second one!
              </h2>}
              {showKnowMorePopup && 
              <p className="text-black">If our mind and gut agree, we feel a sense of reward—it feels good, like we made the right choice.
                But if they don’t agree, we get a warning feeling in our gut, even if we can’t. Thats why you chose a second pick!
              </p>}
              {!showKnowMorePopup&& <button
                onClick={() => handleKnowMore()}
                className="mt-6 px-6 py-3 bg-blue-900 w-full text-white rounded-full"
              >
                Do you know why ? 
              </button>}
              <button
                onClick={() => setShowPickAgainPopup(false)}
                className="mt-3 px-6 py-3 bg-blue-900 w-full text-white rounded-full"
              >
                Close
              </button>
            </div>
          </ReactModal>
        </div>
      </div>
      <p className="text-gray-600 md:mt-20 mt-24 ">Image Designed by <a href="https://www.freepik.com/" className="text-blue-500" target="blank">Freepik</a></p>
    </div>
  );
}
