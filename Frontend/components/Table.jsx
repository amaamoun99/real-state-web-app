import React, { useState } from "react";
import EditPropertyModal from "./EditPropertyModal";

const Table = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="max-h-[36rem] overflow-auto">
        <table className="table-auto w-full text-left text-white">
          <thead className="sticky top-0 bg-gray-800">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Refrence</th>
              <th className="px-4 py-2">Bedrooms</th>
              <th className="px-4 py-2">Bathrooms</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Property Type</th>
              <th className="px-4 py-2">Finishing</th>
              <th className="px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr
                key={`${property.Reference || ""}-${index}`}
                className="border-b border-gray-700 text-black"
              >
                <td className="px-4 py-2">{property.Title}</td>
                <td className="px-4 py-2">{property.Reference}</td>
                <td className="px-4 py-2">{property.Bedrooms}</td>
                <td className="px-4 py-2">{property.Bathrooms}</td>
                <td className="px-4 py-2">{property.Price}</td>
                <td className="px-4 py-2">{property.Property_Type}</td>
                <td className="px-4 py-2">{property.Finishing}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEditClick(property)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <EditPropertyModal
          property={selectedProperty}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Table;
