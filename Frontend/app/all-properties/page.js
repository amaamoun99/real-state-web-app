"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard'; // Import the PropertyCard component

export default function Properties() {
  const [properties, setProperties] = useState([]); // Initial state as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/properties`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is an array before setting it
        if (Array.isArray(response.data.data.data)) {
          setProperties(response.data.data.data); // Correctly set the properties
        } else {
          throw new Error('Response is not an array');
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false); // Ensure loading state is managed here
      }
    };

    fetchProperties();
  }, []); // Dependency array ensures this runs only once

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-center text-3xl font-bold text-white mb-10">Our Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <PropertyCard property={property} />
            </div>
          ))
        ) : (
          <div className="text-center text-white">No properties available</div>
        )}
      </div>
    </div>
  );
}
