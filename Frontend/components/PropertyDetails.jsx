'use client'; // Required for using hooks in components

export default function PropertyDetails({ property }) {
  return (
    <div className="space-y-6">
      {/* Property Title */}
      <h1 className="text-3xl font-bold text-gray-800">{property.Title}</h1>

      {/* Property Image */}
      <div className="flex flex-wrap gap-4">
        {property.images.map((image, index) => (
          <div key={index} className="relative h-48 w-48 flex-shrink-0">
            <img
              src={`http://localhost:3001/img/products/${image}`}
              alt={`${property.Title} - Image ${index + 1}`}
              className="rounded-lg object-cover h-full w-full"
            />
          </div>
        ))}
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Details</h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><strong>Bedrooms:</strong> {property.Bedrooms}</li>
            <li><strong>Bathrooms:</strong> {property.Bathrooms}</li>
            <li><strong>Size:</strong> {property.Size} sq ft</li>
            <li><strong>Floors:</strong> {property.Floors}</li>
            <li><strong>Finishing:</strong> {property.Finishing}</li>
            <li><strong>Furnished:</strong> {property.Furnished ? 'Yes' : 'No'}</li>
            <li><strong>ACs:</strong> {property.ACs ? 'Yes' : 'No'}</li>
            <li><strong>Maid's Room:</strong> {property.Maids_Room ? 'Yes' : 'No'}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Location</h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><strong>Map Location:</strong> {property.Map_Location}</li>
            <li><strong>Compound:</strong> {property.Compound}</li>
          </ul>
        </div>
      </div>

      {/* Property Description */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Description</h2>
        <p className="mt-2 text-gray-600">{property.Unit_Description}</p>
      </div>

      {/* Price */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Price</h2>
        <p className="mt-2 text-2xl font-bold text-gray-800">${property.Price}</p>
      </div>
    </div>
  );
}