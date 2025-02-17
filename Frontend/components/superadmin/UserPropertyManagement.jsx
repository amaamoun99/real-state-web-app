"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UserPropertyManagement() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties`
      );
      // Filter to only include properties from regular users
      const userProperties = response.data.data.data.filter(
        (property) => property.owner?.role === "user"
      );
      setProperties(userProperties);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProperty = async (propertyId) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${propertyId}`,
        { Status: "approved" }
      );
      // Refresh the properties list after approval
      await fetchProperties();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to approve property");
    }
  };

  const handleRejectProperty = async (propertyId) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${propertyId}`,
        { Status: "rejected" }
      );
      // Refresh the properties list after rejection
      await fetchProperties();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reject property");
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${propertyId}`
      );
      // Refresh the properties list after deletion
      await fetchProperties();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete property");
    }
  };

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Property Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
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
                Owner Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.Title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      property.Status === "approved"
                        ? "bg-green-100 text-green-800"
                        : property.Status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {property.Status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.owner?.name || "No owner"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.owner?.role || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {property.owner?.role === "user" && (
                    <>
                      <button
                        onClick={() => handleApproveProperty(property._id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectProperty(property._id)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
