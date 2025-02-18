"use client"; // Required for using hooks in components
import { useState } from "react";

export default function PropertyDetails({ property }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image click
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Main Property Image with Details Overlay */}
      <div className="relative h-[400px] w-full mb-8">
        <img
          src={`http://localhost:3001/img/products/${property.coverPhoto}`}
          alt={property.Title}
          className="rounded-lg object-cover h-full w-full cursor-pointer"
          onClick={() =>
            handleImageClick(
              `http://localhost:3001/img/products/${property.coverPhoto}`
            )
          }
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                ${property.Price}/Year
              </h1>
              <p className="text-gray-600">{property.Map_Location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Property Stats */}
      <div className="flex justify-between items-center px-4 py-3 bg-white rounded-lg">
        <div className="text-center">
          <p className="text-gray-600">Bedrooms</p>
          <div className="flex items-center gap-2 justify-center">
            <span className="font-bold">{property.Bedrooms}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Bathrooms</p>
          <div className="flex items-center gap-2 justify-center">
            <span className="font-bold">{property.Bathrooms}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Area</p>
          <div className="flex items-center gap-2 justify-center">
            <span className="font-bold">{property.Size}</span>
            <span className="text-sm">ft²</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Description
        </h2>
        <p className="text-gray-600">{property.Unit_Description}</p>
      </div>

      {/* Closer Locations */}
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 ">
          Closer Locations
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-gray-600">{property.Map_Location}</span>
          </div>
          {property.Compound && (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-gray-600">{property.Compound}</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {property.images.slice(1).map((image, index) => (
          <div key={index} className="relative h-24 w-24 flex-shrink-0">
            <img
              src={`http://localhost:3001/img/products/${image}`}
              alt={`${property.Title} - Image ${index + 2}`}
              className="rounded-lg object-cover h-full w-full cursor-pointer"
              onClick={() =>
                handleImageClick(`http://localhost:3001/img/products/${image}`)
              }
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-100 p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-3xl max-h-[80vh] w-full mx-auto">
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 z-10"
              onClick={handleCloseModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Expanded view"
              className="w-[80%] h-[80%] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
