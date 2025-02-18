"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function PropertyManagement() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties`
      );
      setProperties(
        response.data.data.data.filter(
          (property) => property.Status === "approved"
        )
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${propertyId}`
        );
        // Refresh the properties list after deletion
        fetchProperties();
      } catch (error) {
        setError(error.response?.data?.message || "Failed to delete property");
      }
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Approved Properties</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search properties by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto max-h-[45vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProperties.map((property) => (
              <tr key={property._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.Title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {property.Status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.owner?.name || "No ownerr"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={`http://localhost:3000/propertyOverview/${property._id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteProperty(property._id)}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
