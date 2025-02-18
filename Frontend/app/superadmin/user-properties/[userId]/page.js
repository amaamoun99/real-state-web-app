"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

export default function UserProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const params = useParams();
  const userId = params.userId; // Get userId from route parameters

  console.log(userId);

  useEffect(() => {
    const fetchUserProperties = async () => {
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      try {
        const userResponse = await axios.get(
          `http://localhost:3001/api/v1/users/${userId}`
        );
        setUserData(userResponse.data.data.data);
      } catch (err) {
        setError("Failed to fetch user details");
        setLoading(false);
        console.error("Error fetching user details:", err);
      }

      try {
        const propertiesResponse = await axios.get(
          `http://localhost:3001/api/v1/properties?owner=${userId}`
        );
        // Ensure we're getting the array from the response
        setProperties(propertiesResponse.data.data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user properties");
        setLoading(false);
        console.error("Error fetching properties:", err);
      }
    };

    fetchUserProperties();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Properties uploaded by {userData?.name}
        </h1>
        <div className="space-y-1">
          <p className="text-gray-600">Email: {userData?.email}</p>
          <p className="text-gray-600">Role: {userData?.role}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No properties found for this user
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {property.Title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {property.Map_Location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {property.Price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.Status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {property.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {property.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`http://localhost:3000/propertyOverview/${property._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
