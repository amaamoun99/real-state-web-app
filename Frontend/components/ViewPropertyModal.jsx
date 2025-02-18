import React from "react";

const ViewPropertyModal = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{property.Title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
        </div>

        {/* Property Image */}
        <div className="mb-4">
          <img
            src={`http://localhost:3001/img/products/${property.coverPhoto}`}
            alt={property.Title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Reference:</p>
            <p>{property.Reference}</p>
          </div>
          <div>
            <p className="font-semibold">Price:</p>
            <p>${property.Price}</p>
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            <p>{property.Map_Location}</p>
          </div>
          <div>
            <p className="font-semibold">Bedrooms:</p>
            <p>{property.Bedrooms}</p>
          </div>
          <div>
            <p className="font-semibold">Bathrooms:</p>
            <p>{property.Bathrooms}</p>
          </div>
          <div>
            <p className="font-semibold">Size:</p>
            <p>{property.Size} sqm</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="font-semibold">Description:</p>
          <p className="text-gray-600">{property.Unit_Description}</p>
        </div>

        {/* Property Images Gallery */}
        {property.images && property.images.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold mb-2">Property Images:</p>
            <div className="grid grid-cols-3 gap-2">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:3001/img/products/${image}`}
                  alt={`${property.Title} - Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPropertyModal;
