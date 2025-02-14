'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/Table'; // Assuming you have a Table component for displaying real estate data

export default function Properties() {
  const [properties, setProperties] = useState([]); // Initial state as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/properties`, {
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
    <div className="container mx-auto py-10">
      <h1 className="text-center text-3xl font-bold text-white mb-6">Real Estate Listings</h1>
      {properties.length > 0 ? (
        <Table properties={properties} /> 
      ) : (
        <div className="text-center">No properties available</div>
      )}
    </div>
  );
}