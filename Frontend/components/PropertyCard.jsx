'use client'; // Required for using hooks in components

import { useRouter } from 'next/navigation';

export default function PropertyCard({ property }) {
  const router = useRouter();

  const handleViewProperty = () => {
    // Navigate to the property details page using the property ID
    router.push(`/propertyOverview/${property._id}`);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
      onClick={handleViewProperty}
    >
      {/* Property Cover Photo */}
      <img
        src={`http://localhost:3001/img/products/${property.coverPhoto}`} // Adjusted path to access the image
        alt={property.Title}
        width={300} // Adjust based on your design
        height={200} // Adjust based on your design
        className="w-full h-32 object-cover"
      />

      {/* Property Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{property.Title}</h3>
        <p className="text-gray-600 mt-2">
          <span className="font-medium">Location:</span> {property.Map_Location}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Price:</span> ${property.Price}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Bedrooms:</span> {property.Bedrooms}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Bathrooms:</span> {property.Bathrooms}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Finishing:</span> {property.Finishing}
        </p>

        {/* View Property Button */}
        <button
          onClick={handleViewProperty}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          View Property
        </button>
      </div>
    </div>
  );
}