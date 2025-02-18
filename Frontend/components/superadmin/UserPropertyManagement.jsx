"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ViewPropertyModal from "../ViewPropertyModal";

export default function UserPropertyManagement() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

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

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterProperties(query, activeFilter);
  };

  // Handle status filter
  const handleStatusFilter = (status) => {
    setActiveFilter(status);
    filterProperties(searchQuery, status);
  };

  // Combined filter function
  const filterProperties = (query, status) => {
    let filtered = properties;

    // Apply search filter
    if (query) {
      filtered = filtered.filter((property) =>
        property.Title.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter(
        (property) => property.Status.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredProperties(filtered);
  };

  // Update filtered properties when main properties list changes
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const handleApproveProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to approve this property?")) {
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${propertyId}`,
        { Status: "approved" }
      );
      await fetchProperties();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to approve property");
    }
  };

  const handleRejectProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to reject this property?")) {
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties/${propertyId}`,
        { Status: "rejected" }
      );
      await fetchProperties();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reject property");
    }
  };

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Property Management</h2>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by property name..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleStatusFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleStatusFilter("approved")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "approved"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => handleStatusFilter("rejected")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "rejected"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Rejected
          </button>
          <button
            onClick={() => handleStatusFilter("pending")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "pending"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[45vh] overflow-y-auto">
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
                Quick View
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    Quick View
                  </button>
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
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProperty && (
        <ViewPropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
